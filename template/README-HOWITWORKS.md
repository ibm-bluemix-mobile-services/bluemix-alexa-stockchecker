## How it works

The directory you are now in is the source code for a Cloud Foundry application that implements the backend for the Alexa skill. The generator has also already created our Cloudant database on Bluemix and populated it with data (the initial data - which is basically some products and stock levels - can be seen in `data/cloudant/products.json`).

Before we deploy the application to Bluemix, you might like to take a look at what's inside it. The main parts of the application are contained within `server.js` and `apps/StockChecker/index.js`. `server.js` uses the [alexa-app-server](https://github.com/alexa-js/alexa-app-server) module to implement a very simple Node.JS-based app server to host multiple Alexa skills (although in our case we are only hosting one). It also contains multiple code paths to handle the possibility of the code running locally versus on a Cloud Foundry environment.

The `apps/StockChecker/index.js` file is more complex, and contains the implementation of the Alexa skill itself. It uses the `alexa-app` npm module to do much of the heavy lifting, and implement the three "intents" (Booking in a new item of stock, Selling an item of stock, and Checking the stock level of an item) using the `app.intent` syntax.

## Running the application locally

To run the application locally, run `npm install` to install its dependent Node.JS packages defined in the `package.json` file. npm will take a few moments to install the packages.

Now run `npm start` to start the application. It will run in your terminal. Note the HTTP port number it gives (probably something like 6006) and open a web browser to `http://localhost:XXXX/alexa/StockChecker`, where XXXX is the port number. This should open a simulation interface provided by the `alexa-app-server` module, which gives us a way to simulate the user's intents that flow up from the Echo device. However, we're not going to use this at this phase.
