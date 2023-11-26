This repository has been deprecated and migrated to https://github.com/autodesk-platform-services/aps-model.properties-elements.filtering


# BIM 360/ACC Model Properties API: Indexing and Element Filtering - Nodejs

[![Node.js](https://img.shields.io/badge/Node.js-14.0-blue.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-6.14-blue.svg)](https://www.npmjs.com/)
[![Platforms](https://img.shields.io/badge/Web-Windows%20%7C%20MacOS%20%7C%20Linux-lightgray.svg)]()

 
[![Forge-Authentication](https://img.shields.io/badge/oAuth2-v1-green.svg)](https://forge.autodesk.com/en/docs/oauth/v2/reference/http/)
[![Forge-Data-Management](https://img.shields.io/badge/Data%20Management-v2-green.svg)](https://forge.autodesk.com/api/data-management-cover-page/)
[![Model Properties API](https://img.shields.io/badge/Model%20PropertiesAPI-2.0-orange)]( https://forge.autodesk.com/en/docs/acc/v1/overview/field-guide/model-properties/) 


[![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Level](https://img.shields.io/badge/Level-Intermediate-blue.svg)](http://developer.autodesk.com/)

![Intermediate](https://img.shields.io/badge/Level-Intermediate-green.svg)

# Description

This sample demonstrates the use case of filtering model elements with specific queries conditions and load the filtered elements in Forge Viewer. It uses **Model Properties API** to index & query the elements.

# Thumbnail
<img src="./help/main.png" width="800"> 

# Demonstration
[![https://youtu.be/X2FCxfJi2g8](http://img.youtube.com/vi/dxqxKUyitU0/0.jpg)](https://youtu.be/dxqxKUyitU0 "Forge Filter Elements by Index API of BIM360/ACC")


# Setup

## Prerequisites

1. **Forge Account**: Learn how to create a Forge Account, activate subscription and create an app at [this tutorial](http://learnforge.autodesk.io/#/account/). For this new app, use **http://localhost:3000/api/forge/callback/oauth** as Callback URL. Finally take note of the **Client ID**, **Client Secret** and Callback URL.
2. **BIM 360 or ACC Account**: must be Account Admin to add the app integration. [Learn about provisioning](https://forge.autodesk.com/blog/bim-360-docs-provisioning-forge-apps). 
3. **Node.js**: basic knowledge with [**Node.js**](https://nodejs.org/en/).
4. Basic knowledge with **html5**,**JavaScript**, **css**,**jQuery** and **bootstrap**
5. Basic knowledge with **Data Management API with BIM 360/Docs**, **Forge Viewer** and **Model Properties API** etc.


## Limitations

This sample uses [JqueryBuilder](https://querybuilder.js.org/) for the user to input filtering conditions. However it does not mean the condition options of JqueryBuilder are exactly to those of Model Properties API. e.g. 
  - the option is called 'equal' in JqueryBuilder, while will be '$eq' in Model Properties API. This sample transforms some options at [operators_map](./public/js/queryBuilder.js#L220-L228), but not all are  transformed. 
  - Model Properties API can support *$like*, while JqueryBuilder does not have such option by default (unless you extend its options list)

For more information about query schemas of Model Properties API, please check [Model Property Service Query Language Reference](https://forge.autodesk.com/en/docs/acc/v1/tutorials/model-properties/query-ref/).

In addition, the indexing of model can have a lot of properties.  Only a few properties options are initialized in [queryBuilder.js](./public/js/queryBuilder.js#L30-L161) for testing Revit model specifically. We suggest you try with the demo Revit models which can be downloaded in [Model Properties API Postman Collection](https://github.com/Autodesk-Forge/forge-model.properties-postman.collection/tree/main/DemoModels). Please add other properties options yourself if needed. 

If you want to test other type of models, please ensure the initialized properties options in the sample are meaningful to your model data. We suggest you to download the demo data by other test tools to inspect the possible properties and get their keys, such as [Model Properties API Postman Collection](https://github.com/Autodesk-Forge/forge-model.properties-postman.collection), or [Model Properties API walkthrough by PowerShell Core](https://github.com/Autodesk-Forge/forge-model-properties.powershell). 

In this sample [**query** button](./public/js/queryBuilder.js#L243-L295), it will iterate each input rules from JqueryBuilder input, and transform the queries with the schemas of Model Properties API. However it only implements one level nested conditions. The more complex nested conditions have not been implemented.You could try to follow the similar logic in the [**query** button](./public/js/queryBuilder.js#L245-L295) to extend its ability.


## Running locally

Install [NodeJS](https://nodejs.org), version 8 or newer.

Clone this project or download it (this `nodejs` branch only). We recommended to install [GitHub desktop](https://desktop.github.com/). To clone it via command line, use the following (**Terminal** on MacOSX/Linux, **Git Shell** on Windows):

    git clone https://github.com/Autodesk-Forge/forge-model.properties-elements.filtering

Install the required packages using `npm install`. Set the environment variables with your client ID, client secret, callback url and finally start it. Via command line, navigate to the folder where this repository was cloned and use the following:

Mac OSX/Linux (Terminal)

    npm install
    export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    export FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
    export FORGE_CALLBACK_URL=<<YOUR CALLBACK URL>>
    npm start

Windows (use **Node.js command line** from Start menu)

    npm install
    set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    set FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
    set FORGE_CALLBACK_URL=<<YOUR CALLBACK URL>>
    npm start

OR, set environment variables at [launch.json](/.vscode/launch.json) for debugging.

 
 ## Use Cases

1. Open the browser: [http://localhost:3000](http://localhost:3000). Please watch the [Video](https://youtu.be/dxqxKUyitU0) for the detail and usage.

2. After the user logging succeeds, the code will start to extract all hubs, all projects, folders and model versions.

3. Click one model version, the corresponding model data will be loaded in left Forge Viewer. Click **Index** button to start indexing  

4. After Indexing in step #3 is done, setup the query conditions in the query panel, click the **Query** button. The code will start to query the specific elements by the queries. 

<img src="./help/query.png" width="800"> 

5. After querying is completed, click **Load** button. Only the elements that match the conditions will be loaded in the viewer.  


## Deployment

To deploy this application to Heroku, the **Callback URL** for Forge must use your `.herokuapp.com` address. After clicking on the button below, at the Heroku Create New App page, set your Client ID, Secret and Callback URL for Forge.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/xiaodongliang/forge-indexapi.model.diff)

### Tips & Tricks

For local development/testing, consider use [nodemon](https://www.npmjs.com/package/nodemon) package, which auto restart your node application after any modification on your code. To install it, use:

    sudo npm install -g nodemon

Then, instead of **npm run dev**, use the following:

    npm run nodemon

Which executes **nodemon server.js --ignore www/**, where the **--ignore** parameter indicates that the app should not restart if files under **www** folder are modified.

### Troubleshooting

After installing Github desktop for Windows, on the Git Shell, if you see an ***error setting certificate verify locations*** error, use the following:

    git config --global http.sslverify "false"
 
# Further Reading

- [Data Management API](https://developer.autodesk.com/en/docs/data/v2/overview/)
- [Viewer](https://developer.autodesk.com/en/docs/viewer/v6)
- [Model Properties API Reference](https://forge.autodesk.com/en/docs/acc/v1/reference/http/index-v2-index-jobs-batch-status-post/)
- [Model Properties API Walkthrough in PowerShell Core](https://github.com/Autodesk-Forge/forge-model-properties.powershell)
- [Postman Collection for Model Properties](https://github.com/Autodesk-Forge/forge-model.properties-postman.collection)
- [Querying Model Properties](https://forge.autodesk.com/en/docs/acc/v1/tutorials/model-properties/query)
- [Tracking Changes in Model Versions](https://forge.autodesk.com/en/docs/acc/v1/tutorials/model-properties/diff)
- [Query Language Reference](https://forge.autodesk.com/en/docs/acc/v1/tutorials/model-properties/query-ref)

### Blogs
- [Forge Blog](https://forge.autodesk.com/categories/bim-360-api)
- [Field of View](https://fieldofviewblog.wordpress.com/), a BIM focused blog

## License
This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

## Written by
Xiaodong Liang [@coldwood](https://twitter.com/coldwood), [Forge Advocate and Support](http://forge.autodesk.com)
