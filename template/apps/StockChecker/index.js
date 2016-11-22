/* eslint-env node */

"use strict";

const alexa = require("alexa-app");

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

const app = new alexa.app("StockChecker");

var cloudant_handle;

function initDBConnection() {
    var dbURL;

    if (!cloudant_handle) {
        if (process.env.VCAP_SERVICES) {
            var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
            for (var vcapService in vcapServices) {
                if (vcapService.match(/cloudant/i)) {
                    dbURL = vcapServices[vcapService][0].credentials
                        .url;
                }
            }
        } else {

            // When running locally, the VCAP_SERVICES will not be set When
            // running this app locally you can get your Cloudant credentials
            // from Bluemix (VCAP_SERVICES in "cf env" output or the
            // Environment Variables section for an app in the Bluemix console
            // dashboard).  Alternately you could point to a local database
            // here instead of a Bluemix service.  url will be in this format:
            // https://username:password@xxxxxxxxx-bluemix.cloudant.com

            dbURL = "PLACEHOLDER";
        }

        cloudant_handle = require('cloudant')(dbURL);
    }
}

function updateStockLevel(db, name, stockleveldelta) {
    db.find({
        selector: {
            name: name
        }
    }, (err, result) => {
        let doc = result.docs[0];
        if (!err) {
            doc.stocklevel = parseInt(doc.stocklevel) + parseInt(stockleveldelta)

            db.insert(doc, doc.id, function(err, doc) {
                return err ? false : true;
            });
        } else {
            return false;
        }
    });
}

app.launch((req, res) => {
    res.say("StockChecker app launched successfully.");
});

app.pre = function(request, response, type) {
    initDBConnection();
};

app.intent("InStock", {
    "slots": {
        "ItemName": "PossibleNames"
    }
}, (req, res) => {
    let itemname = req.slot("ItemName");
    const db = cloudant_handle.use('products');

    db.find({
        selector: {
            name: itemname
        }
    }, (err, result) => {
        const stockLevel = result.docs[0].stocklevel;
        if (!err) {
            if (stockLevel > 1) {
                res.say(`There are ${stockLevel} items in stock.`);
            } else if (stockLevel == 1) {
                res.say(`There is one item in stock.`);
            } else {
                res.say(`We are out of stock of that item.`);
            }

            res.send();
        }
    });

    // You must return false at this point otherwise the alexa-app framework
    // immediately returns the response. We want it to asynchronously wait for
    // the res.send() call above.
    return false;
});

app.intent("Sold", {
    "slots": {
        "ItemName": "PossibleNames",
        "Count": "NUMBER"
    }
}, (req, res) => {
    let itemname = req.slot("ItemName");
    let count = req.slot("Count");

    const db = cloudant_handle.use('products');

    updateStockLevel(db, itemname, -count).then(() =>
        res.say(`${count} of ${itemname} marked as sold.`));

    // You must return false at this point otherwise the alexa-app framework
    // immediately returns the response. We want it to asynchronously wait for
    // the res.send() call above.
    return false;
});

app.intent("BookIn", {
    "slots": {
        "ItemName": "PossibleNames",
        "Count": "NUMBER"
    }
}, (req, res) => {
    let itemname = req.slot("ItemName");
    let count = req.slot("Count");

    const db = cloudant_handle.use('products');

    updateStockLevel(db, itemname, count).then(() =>
        res.say(`${count} of ${itemname} booked in.`));

    // You must return false at this point otherwise the alexa-app framework
    // immediately returns the response. We want it to asynchronously wait for
    // the res.send() call above.
    return false;
});

module.exports = app;
