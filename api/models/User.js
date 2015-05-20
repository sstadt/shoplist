/**
* User.js
*
* @description :: Site users
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  schema: true,
  attributes: {

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    confirmed: {
      type: 'boolean',
      defaultsTo: false
    },
    encryptedPassword: {
      type: 'string'
    },
    config: {
      type: 'json'
    },
    toJSON: function () {
      var obj = this.toObject();

      delete obj.password;
      delete obj.confirmed;
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.encryptedPassword;
      delete obj._csrf;

      return obj;
    }

  },

  beforeCreate: function (values, next) {
    if (!values.password || values.password !== values.confirmation) {
      return next({
        err: ["Passwords don't match"]
      });
    }

    bcrypt.hash(values.password, 10, function passwordEncryption(err, encryptedPassword) {
      if (err) {
        return next(err);
      }

      delete values.password;
      delete values.confirmation;
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }
};

