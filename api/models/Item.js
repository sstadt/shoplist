/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    list: {
      type: 'string',
      required: true
    },
    quantity: {
      type: 'integer',
      min: 0,
      defaultsTo: 1
    },
    checked: {
      type: 'boolean',
      defaultsTo: false
    }
  }

};

