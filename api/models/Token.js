/**
* Token.js
*
* @description :: User REgistration tokens
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    token: {
      type: 'string',
      required: true
    },
    user: {
      type: 'string',
      required: true
    }

  }
};

