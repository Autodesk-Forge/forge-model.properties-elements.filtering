
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
const SocketEnum = {
  INDEX_TOPIC: 'index topic',
  INDEX_DONE: 'index done',
  DIFF_INDEX_DONE: 'diff index done',
  QUERY_DONE: 'index query done',
  DIFF_QUERY_DONE: 'diff query done',
  ERROR: 'index errors'
};

//socket host 

const HOST_URL = window.location.host;
socketio = io.connect('http://' + HOST_URL);
socketio.on(SocketEnum.INDEX_TOPIC, async (d) => { 

  const jsonData = JSON.parse(d)

  switch (jsonData.message) {
    case SocketEnum.INDEX_DONE:
      console.log('index done')
      global_queryBuilder.index_id = jsonData.index_id

      $('#indexing_img').show()
      $('#indexing_running_img').hide()

      $.notify(SocketEnum.INDEX_DONE,'warn');   

      break;
    case SocketEnum.QUERY_DONE:
      console.log('query done')
      var properties = jsonData.properties
      global_queryBuilder.ids = properties.map(d => d.svf2Id); 

      $('#query_img').show()
      $('#query_running_img').hide()
      $.notify(SocketEnum.QUERY_DONE,'warn');   

      break;
    case SocketEnum.ERROR:

      $('#query_img').show()
      $('#query_running_img').hide()     
       console.log('problem with the process')
      $.notify(SocketEnum.ERROR,'warn');   

      break;
  }
})