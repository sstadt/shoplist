
// TODO: Move validation here

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

  getLastError: function () {
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

  resetPassword: function (password, user) {
    var deferred = Q.defer();

    this.hashPassword(password)
      .fail(function (err) {
        deferred.reject(err);
        return;
      })
      .done(function (encryptedPassword) {
        User.update(user.id, { encryptedPassword: encryptedPassword }, function (err) {
          if (err) {
            deferred.reject(err);
          } else {
            Token.destroy({ user: user.id }, function () {
              deferred.resolve();
            });
          }
        });
      });

    return deferred.promise;
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

