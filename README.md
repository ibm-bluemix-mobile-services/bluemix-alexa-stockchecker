# IBM Bluemix Alexa Integration
[![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)

### Summary
This Backend for Frontend template uses a **LoopBack** Node.js runtime with the **Cloudant NoSQL DB** service on Bluemix to support and illustrate a scenario supporting an Amazon Alexa skill for a retail scenario. The template exhibits common architectural design patterns that developers can use to model their backend on Bluemix to support integration for a voice-driven skill application. It has the ability to "add", "sell", and "check" products' stock levels.

The backend uses the following Bluemix services and runtime:

**Runtime**
* **Node.js** for supporting Alexa skill integration.

**Services**
* **Cloudant NoSQL DB** to hold a list products in a NoSQL database.

### Data architecture

*TODO*: Placeholder, image needs to go here.

## Configuring the Backend

The backend can be easily installed using the **bluegen** command line tool. This CLI tool logs you into Bluemix and prepares the backend services for use. It automatically provisions the services and populates them with the test data required to get up to speed quickly.

### Before you begin
Ensure that you have:

* An IBM Bluemix Account. You can sign up for a free account at <http://bluemix.net/>.

* The [Cloud Foundry CLI tool](https://github.com/cloudfoundry/cli) installed.

* A Node.JS runtime and the npm tooling [installed locally](https://nodejs.org/en/download/package-manager/).

* An Amazon Developer account for Alexa. If you don't have one, navigate to <https://developer.amazon.com/edw/home.html#/> to set one up. You should use the same Amazon account that's associated with your Alexa device(s) you want to test the skill on.

* The [Bluemix Generator CLI tool](https://www.npmjs.com/package/bluemix-generator) installed by typing the command:

	`npm install -g bluemix-generator`

> **Note:** If you have issues installing these packages globally, it is likely an issue with your permissions. See the [official npm instructions for how to fix permission issues](https://docs.npmjs.com/getting-started/fixing-npm-permissions) in their **Getting Started**.

### Create your backend from this template

1. First, clone this project into your working directory:

	`git clone https://github.com/ibm-bluemix-mobile-services/bluemix-alexa-stockchecker.git`

2. Run the following command in the root directory of your cloned project. This will create the required services on Bluemix and populate them with the necessary test data:

	`bluegen`

3. Navigate to your newly created projects folder (`projects/<whatevernameyougavethebackend>`). If you are interested, you will find a file called `README-HOWITWORKS.md` that explains how the generated application works and how to test it locally.

4. Upload your backend to Bluemix by typing these commands:

	`cf login [-a API_URL] [-u USERNAME] [-o ORG] [-s SPACE]`

	`cf push`

   After running `cf push`, you should be able to see the application running on the Bluemix dashboard. Visiting the application route will greet you with a landing page displaying more information about this template and the ability to explore the API.

5. To run your backend locally, type the commands:

	`npm install`

	`npm start`

   (You can test this local instance by opening a web browser to `http://localhost:XXXX/alexa/StockChecker`, where XXXX is the port number printed when you start the app).

### License
This package contains sample code provided in source code form. The samples are licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 and may also view the license in the license file within this package.
