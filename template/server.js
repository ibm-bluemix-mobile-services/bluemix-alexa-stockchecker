'use strict';

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

// Load Alex App Server
var AlexaAppServer = require('alexa-app-server');

if (appEnv.isLocal) {
    console.log("Running locally");
    var server = new AlexaAppServer({
        httpsEnabled: false,
        port: appEnv.port
    });
} else {
    console.log("Running inside Cloud Foundry");
    var server = AlexaAppServer({
        port: appEnv.port,
        "post": (appServer) => {
            console.log(`Server starting on ${appEnv.url}`);
        }
    });
}

// Start the Server
server.start();
