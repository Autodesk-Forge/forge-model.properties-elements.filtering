
/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

const fs = require("fs")
const mkdir = require('mkdirp')
const utility = require("./utility")
const indexAPI = require('./services/index-api');


const indexFolder = './indexFolder/'

var DataNameEnum = {
  INDEX_MANIFEST: 'index-manifest.json',
  INDEX_FIELDS: 'index-fields.json.gz',
  INDEX_PROPERTIES: 'index-properties.json.gz',
  INDEX_QUERY_PROPERTIES: 'index-query-properties.json.gz'
};

if (!fs.existsSync(indexFolder))
  mkdir.mkdirp(indexFolder, (err) => { if (!err) console.log('folder ./indexFolder/ is created') })

module.exports = {
  downloadIndexData,
  downloadQueryData
}

async function downloadIndexData(project_id, index_id,isDiff) { 
     //create a folder to store the index data for this index 
     const thisIndexFolder = indexFolder + project_id + '/'+ index_id + '/'
     if (!fs.existsSync(thisIndexFolder)) {
       fs.mkdirSync(thisIndexFolder, { recursive: true });
     }   

     const manifest = await getIndexManifest(thisIndexFolder,project_id, index_id,isDiff)
     const fields =  await getIndexFields(thisIndexFolder,project_id, index_id,isDiff)

     if(isDiff){
        const properties = await getIndexProperties(thisIndexFolder,project_id, index_id,isDiff) 
        return {
          manifest:manifest,
          fields:fields,
          properties:properties
         }
     }else{
      return {
        manifest:manifest,
        fields:fields
       }
     }
    
}

async function downloadQueryData(project_id, index_id,query_id,isDiff) { 
  //create a folder to store the index data for this index 
  const thisIndexFolder = indexFolder + project_id + '/'+ index_id + '/'+query_id +'/'
  if (!fs.existsSync(thisIndexFolder)) {
    fs.mkdirSync(thisIndexFolder, { recursive: true });
  }   
 
  const properties = await getQueryResults(thisIndexFolder,project_id, index_id,query_id,isDiff) 
  return { 
    properties:properties
   }
}
 

async function getIndexManifest(folder,project_id, index_id,isDiff){

  if(fs.existsSync(folder + DataNameEnum.INDEX_MANIFEST)) { 
    console.log(DataNameEnum.INDEX_MANIFEST + ' are available at' + folder) 
   
  }else{
      const manifest = await indexAPI.getIndexManifest(project_id, index_id,isDiff)
      await utility.saveJsonObj(folder, DataNameEnum.INDEX_MANIFEST, manifest)  
   } 
   const manifest = fs.readFileSync(folder+DataNameEnum.INDEX_MANIFEST)
   return manifest 

}

async function getIndexFields(folder,project_id, index_id,isDiff){

  if(fs.existsSync(folder + DataNameEnum.INDEX_FIELDS)) { 
    console.log(DataNameEnum.INDEX_FIELDS + ' are available at' + folder) 
  }else{
      await indexAPI.getIndexFields(project_id, index_id,isDiff,folder,DataNameEnum.INDEX_FIELDS)
      console.log(DataNameEnum.INDEX_FIELDS + ' downloaded at ' + folder ) 
     
   } 
   const propertiesJson =await utility.readLinesFile(folder+DataNameEnum.INDEX_FIELDS) 
   return propertiesJson

}

async function getIndexProperties(folder,project_id, index_id,isDiff){

  if(fs.existsSync(folder + DataNameEnum.INDEX_PROPERTIES)) { 
    console.log(DataNameEnum.INDEX_PROPERTIES + ' are available at' + folder) 
  }else{
      await indexAPI.getIndexProperties(project_id, index_id,isDiff,folder,DataNameEnum.INDEX_PROPERTIES)
      console.log(DataNameEnum.INDEX_PROPERTIES + ' downloaded at ' + folder ) 
     
   } 
   const propertiesJson =await utility.readLinesFile(folder+DataNameEnum.INDEX_PROPERTIES) 
   return propertiesJson

}

async function getQueryResults(folder,project_id, index_id,query_id,isDiff){

  if(fs.existsSync(folder + DataNameEnum.INDEX_QUERY_PROPERTIES)) { 
    console.log(DataNameEnum.INDEX_QUERY_PROPERTIES + ' are available at' + folder) 
  }else{
      await indexAPI.getQueryProperties(project_id, index_id,query_id,isDiff,folder,DataNameEnum.INDEX_QUERY_PROPERTIES)
      console.log(DataNameEnum.INDEX_QUERY_PROPERTIES + ' downloaded at ' + folder ) 
     
   } 
   const propertiesJson =await utility.readLinesFile(folder+DataNameEnum.INDEX_QUERY_PROPERTIES) 
   return propertiesJson

}



 