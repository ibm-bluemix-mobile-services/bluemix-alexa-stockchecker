# IBM Bluemix Alexa Integration

Update for new 

[![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)

### IBM Bluemix Alexa Integration
The backend uses the following Bluemix services and runtime:

**Services**
* **Cloudant NoSQL DB** to hold a list products in a NoSQL database

## Configuring the Backend

The backend can be easily installed using the **bluegen** command line tool. This CLI tool logs you into Bluemix and prepares the backend services for use. It automatically provisions the services and populates them with the test data required to get up to speed quickly.

### Before you begin
Ensure that you have:

* The [Cloud Foundry CLI tool](https://github.com/cloudfoundry/cli) installed
* The [Bluemix Generator CLI tool](https://www.npmjs.com/package/bluemix-generator) installed by typing the command:

	`npm install -g bluemix-generator`

> **Note:** If you have issues installing these packages globally, it is likely an issue with your permissions. See the [official npm instructions for how to fix permission issues](https://docs.npmjs.com/getting-started/fixing-npm-permissions) in their **Getting Started**.

### Create your backend from this template

1. First, clone this project into your working directory:

	`git clone https://github.com/ibm-bluemix-mobile-services/mobiledashboard-storecatalog-backend.git`

2. Run the following command in the root directory of your cloned project. This will create the required services on Bluemix and populate them with the necessary test data:

	`bluegen`

3. Navigate to your newly created projects folder.
4. Upload your backend to Bluemix by typing these commands:

	`cf login [-a API_URL] [-u USERNAME] [-o ORG] [-s SPACE]`

	`cf push`

   After running `cf push`, you should be able to see the application running on the Bluemix dashboard. Visiting the application route will greet you with a landing page displaying more information about this template and the ability to explore the API.

5. If you want to configure or extend your backend, you can edit the API configuration locally by running the commands:

	`npm install`

    Also, typing the command `npm start` will run the backend locally. (This won't allow you to edit the API configuration.)

6. Redeploy data to **Cloudant NoSQL DB** and **Object Storage** by running this command in your project directory:

	`bluegen`

### License
This package contains sample code provided in source code form. The samples are licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 and may also view the license in the license file within this package.
