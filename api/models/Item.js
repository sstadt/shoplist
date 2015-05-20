/**
* Item.js
*
* @description :: Items contained in a shopping list, where the list attribute refers to the owning list's ID
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

