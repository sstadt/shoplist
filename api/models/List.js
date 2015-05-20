/**
* List.js
*
* @description :: Shopping list settings and owner data
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    owner: {
      type: 'string'
    },
    shared: {
      type: 'array',
      defaultsTo: []
    }
  }
};

