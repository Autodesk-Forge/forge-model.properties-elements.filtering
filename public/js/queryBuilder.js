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

class QueryBuilder {

  constructor() {


    this.project_id=null 
    this.model_version =null
    this.model_urn = null
    this.index_id = null 
    this.ids = []

    this.rules_basic = {
      condition: 'AND',
      rules: [{
        id: 'p01bbdcf2',
        operator: 'equal',
        value: 0
      }, {
        condition: 'OR',
        rules: [{
          id: 'p5eddc473',
          operator: 'equal',
          value: ''
        }, {
          id: 'pf9083fcd',
          operator: 'equal',
          value: 1
        },
        {
          id: 'p2508403c',
          operator: 'less',
          value: 0.11
        }]
      }]
    };

    this.filters = [
      {
        id: 'p153cb174',
        label: 'Name',
        denote: 'p153cb174',
        type: 'string'
      },
      {
        id: 'p01bbdcf2',
        label: 'Level',
        denote: 'p01bbdcf2',
        type: 'integer',
        input: 'select',
        values: { 0: 'dummy' }
      },
      {
        id: 'p5eddc473',
        label: 'Category',
        denote: 'p5eddc473',
        type: 'string'
      },
      {
        id: 'p20d8441e',
        label: 'RC',
        denote: 'p20d8441e',
        type: 'string'
      },
      {
        id: 'p2c0bde18',
        label: 'System Classification',
        denote: 'p2c0bde18',
        type: 'string'
      },
      {
        id: 'p2508403c',
        label: 'Free Size',
        denote: 'p2508403c',
        type: 'double'
      },
      {
        id: 'p849f0aa2',
        label: 'Length',
        denote: 'p849f0aa2',
        type: 'double'
      },
      {
        id: 'p1b2aabe1',
        label: 'Elevation from Level',
        denote: 'p1b2aabe1',
        type: 'double'
      },
      {
        id: 'views',
        label: 'Views',
        denote: '',
        type: 'integer',
        operators: ['equal', 'less', 'greater']
      },
      {
        id: 'paa0bfbcc',
        label: 'Left Arrow',
        denote: 'paa0bfbcc',
        type: 'integer',
        input: 'radio',
        values: {
          1: 'True',
          0: 'False'
        },
        operators: ['equal']
      },
      {
        id: 'pf9083fcd',
        label: 'Right Arrow',
        denote: 'pf9083fcd',
        type: 'integer',
        input: 'radio',
        values: {
          1: 'True',
          0: 'False'
        },
        operators: ['equal']
      },
      {
        id: 'pae499ad7',
        label: 'Down Arrow',
        denote: 'pae499ad7',
        type: 'integer',
        input: 'radio',
        values: [
          true,
          false
        ],
        operators: ['equal']
      },
      {
        id: 'pe0a4f5d6',
        label: 'Up Arrow',
        denote: 'pe0a4f5d6',
        type: 'integer',
        input: 'radio',
        values: {
          1: 'True',
          0: 'False'
        },
        operators: ['equal']
      }
    ]

    this.aec_data = null
    this.aec_data = null

  }

  async reset() {
    $('#builder').queryBuilder('reset'); 
    $('#builder').queryBuilder('setFilters', this.filters)


  }

  async initBuilder() {
    $('#builder').queryBuilder({
      plugins: ['bt-tooltip-errors'],
      filters: this.filters,
      rules: this.rules_basic
    })

    $('#index').on('click', function () {

      $('#indexing_img').hide()
      $('#indexing_running_img').show()

      $.ajax({
        url: '/api/forge/index/' + global_queryBuilder.project_id + '/false',
        type: 'POST',
        dataType: 'json',
        data: {
          versions: [
            {
              versionUrn: global_queryBuilder.model_version
            }
          ]
        },
        success: function (data) {
        },
        error: function (error) {
        }
      });
    });

    $('#reset').on('click', function () {
      $('#builder').queryBuilder('reset');
    });

    $('#load').on('click', function () {
      if (global_queryBuilder.ids.length == 0)
        alert('no objects are found!')
      else
        loadModel(forgeViewer_right, global_queryBuilder.model_urn)
    });

    $('#query').on('click', function () {
      var result = $('#builder').queryBuilder('getRules');

      const operators_map = {
        'equal': '$eq',
        'not_equal': '$ne',
        'greater': '$gt',
        'less': '$lt',
        'AND': '$and',
        'OR': '$or'
      }

      var payload = {
        query: {

        },
        //this sample gets the svf2Id only, so  transform svf2Id only by setting columns
        columns:{
          svf2Id:'s.svf2Id'
        }
      }
      if (!$.isEmptyObject(result)) {
        //alert(JSON.stringify(result, null, 2));

        const top_cond = result.condition

        if (top_cond) {
          payload.query[`${operators_map[top_cond]}`] = []

          for (var i = 0; i < result.rules.length; i++) {
            var oneRule = result.rules[i]
            if (oneRule.condition) {
              var oneSubConPayload = {}
              if (!(`${operators_map[oneRule.condition]}` in oneSubConPayload))
                oneSubConPayload[`${operators_map[oneRule.condition]}`] = []
              for (var j = 0; j < oneRule.rules.length; j++) {
                var oneSubRule = oneRule.rules[j]
                var oper = operators_map[oneSubRule.operator]
                var denote = `s.props.${oneSubRule.id}`
                var value = oneSubRule.value
                if (oneSubRule.type == 'string')
                  value = `'${oneSubRule.value}'`
                else if (oneSubRule.input == 'select')
                  value = `'${oneSubRule.value}'`
                else if (oneSubRule.type == 'double')
                  value = Number(`${oneSubRule.value}`)
                else { 
                }
                var r = {}
                r[`${oper}`] = [denote, value]
                oneSubConPayload[`${operators_map[oneRule.condition]}`].push(r)

              }

              payload.query[`${operators_map[top_cond]}`].push(oneSubConPayload)

            } else {
              var oper = operators_map[oneRule.operator]
              var denote = `s.props.${oneRule.id}`
              var value = oneRule.value
              if (oneRule.type == 'string')
                value = `'${oneRule.value}'`
              else if (oneRule.input == 'select')
                value = `'${oneRule.value}'`
              else if (oneRule.input == 'radio') {
                value = oneRule.value
              }
              else if (oneRule.type == 'double')
                value = Number(`${oneRule.value}`)
              else { 
              }
              var r = {}
              r[`${oper}`] = [denote, value]
              payload.query[`${operators_map[top_cond]}`].push(r)
            }
          }
        } else { 
        }

      }

      $('#query_running_img').show()
      $.ajax({
        url: '/api/forge/query/' + global_queryBuilder.project_id + '/' + global_queryBuilder.index_id + '/false',
        type: 'POST',
        dataType: 'json',
        data: { query: JSON.stringify(payload) },
        success: function (data) {
        },
        error: function (error) {
        }
      });

    });

  }
}


