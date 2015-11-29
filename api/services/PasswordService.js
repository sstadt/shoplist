
// TODO: Move hashing and validation here
// use this in registration as well

var Q = require('q'),
  bcrypt = require('bcrypt'),
  settings = {
    minLength: 6,
    maxLength: 20,
    lowerCase: true,
    upperCase: true,
    number: true,
    special: true
  },
  lastError = [];

module.exports = {

  error: function () {
    var error = lastError;

    lastError = [];

    return error;
  },

  isSecure: function (password, confirmation) {
    // TODO: add password rules for enhanced security
    // TODO: Move settings to a config file
    var matches = (password === confirmation),
      secure = true,
      longEnough = (settings.minLength === 0 || password.length >= settings.minLength),
      shortEnough = (settings.maxLength === 0 || password.length <= settings.maxLength);

    if (!secure) {
      lastError.push('password does not meet complexity requirements');
    }

    if (!longEnough) {
      lastError.push('Password must contain at least ' + settings.minLength + ' characters');
    }

    if (!shortEnough) {
      lastError.push('Password may not contain more than ' + settings.maxLength + ' characters');
    }

    if (!matches) {
      lastError.push('Passwords do not match');
    }

    return matches && secure && longEnough && shortEnough; 
  },

  hashPassword: function (password) {
    var deferred = Q.defer();

    bcrypt.hash(password, 10, function passwordEncryption(err, encryptedPassword) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(encryptedPassword);
      }
    });

    return deferred.promise;
  }

};

