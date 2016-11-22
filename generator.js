/*
 * Copyright 2016 IBM Corp.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/* eslint-env node, es6 */
/* eslint no-console: off, prefer-template: off */

"use strict";

const fs = require("fs");
const cloudant = require("cloudant");

(function generator(module) {
    const getDBConnection = (services) => {
        const cloudantService = services.cloudantNoSQLDB;

        return cloudant(cloudantService.credentials.url);
    };

    module.exports = function exports(app) {
        const config = {
            "app": {},
            "services": {}
        };

        app.events.on("validation", (event, resolve, reject) => {
            resolve();
        });

        app.events.on("preferences", (event, resolve) => {
            resolve(config.app = event);
        });

        app.events.on("service", (event, resolve) => {
            resolve(config.services[event.type] = event);
        });

        app.events.on("complete", (event, resolve) => {
            const db = getDBConnection(config.services).use("products");
            const path = `${event.home}/skill-metadata`;

            new Promise((res, reject) => {
                db.list((err, body) => {
                    if (!err) {
                        res(body);
                    } else {
                        reject(err);
                    }
                });
            }).then((body) => {
                return Promise.all(body.rows.map((doc) => {
                    return new Promise((res, reject) => {
                        db.get(doc.id, {}, (err, docBody) => {
                            if (!err) {
                                res(docBody.name);
                            } else {
                                reject(err);
                            }
                        });
                    });
                }));
            }).then((names) => {
                return new Promise((res, reject) => {
                    fs.writeFile(`${path}/customslots.txt`, names.join("\n"), (err) => {
                        if (err) {
                            reject();
                        } else {
                            res();
                        }
                    });
                });
            }).then((names) => {
                return new Promise((res, reject) => {
                    const name = {
                        "name": "name",
                        "type": "json",
                        "index": {
                            "fields": ["name"]
                        }
                    };

                    db.index(name, (err, response) => {
                        if (err) {
                            reject();
                        } else {
                            res();
                        }
                    });
                });
            }).then(() => {
                console.log("Finished copying template\n");
                console.log("Your project has been created at " + app.text.yellow("projects/") +
                    app.text.yellow(config.app.get("name")) + "\n");
                console.log("Next steps:\n");
                console.log("  First, navigate to your project directory");
                console.log(app.text.green("    $ cd ") + app.text.yellow("projects/") + app.text.yellow(
                    config.app.get("name")) + "\n");
                console.log("  Upload your backend to Bluemix");

                let loginCmd = app.text.green("    $ cf login -a ") + app.text.yellow(config.app.get(
                    "region.api"));

                if (config.app.get("username", false)) {
                    loginCmd += app.text.green(" -u ") + app.text.yellow(config.app.get(
                        "username", false));
                } else {
                    loginCmd += app.text.green(" -u [USERNAME]");
                }

                loginCmd += app.text.green(" -o ") + app.text.yellow(config.app.get("org.name")) +
                    app.text.green(" -s ") + app.text.yellow(config.app.get("space.name"));

                console.log(loginCmd);

                console.log(app.text.green("    $ cf push\n"));
                console.log("  Redeploy data to Cloudant NoSQL DB");
                console.log(app.text.green("    $ bluegen\n"));
            });
        });
    };
})(module);
