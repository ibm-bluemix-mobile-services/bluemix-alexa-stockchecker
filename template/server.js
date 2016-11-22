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
        // Andrew: for the moment this seems to run without these just fine in
        // Bluemix. We might need them later when we do authentication I'm not
        // sure, but it works OK on the Bluemix HTTPS endpoint by default, and
        // the Alexa Dev Console seems OK with it.
        //
        // httpsEnabled: true,
        // privateKey:'private-key.pem',
        // certificate:'cert.cer'
        "post": (appServer) => {
            console.log(`Server starting on ${appEnv.url}`);
        }
    });
}

// Start the Server
server.start();
