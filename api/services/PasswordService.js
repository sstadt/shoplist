

var Q = require('q'),
  bcrypt = require('bcrypt'),
  settings = {
    minLength: sails.config.passwords.minLength,
    maxLength: sails.config.passwords.maxLength,
    lowercase: sails.config.passwords.lowerCase,
    uppercase: sails.config.passwords.upperCase,
    number: sails.config.passwords.number,
    special: sails.config.passwords.special
  },
  lastError = [];

/**
 * Determine if a password meets configured
 * complexity requirements.
 * 
 * @param  {string} password The password to check requirements agains
 * @return {array}           Array of security error strings
 */
function getPasswordComplexityErrors(password) {
  var lowercasePattern = new RegExp(/[a-z]/),
    uppercasePattern = new RegExp(/[A-Z]/),
    numberPattern = new RegExp(/[0-9]/),
    specialPattern = new RegExp(/[^A-Za-z0-9]/),
    errors = [];

  if (settings.lowercase && !lowercasePattern.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (settings.uppercase && !uppercasePattern.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (settings.number && !numberPattern.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (settings.special && !specialPattern.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return errors;
}

module.exports = {

  /**
   * Get the last error stored in PasswordService.
   *
   *  WARNING: Invoking this function will
   *           clear the current errors.
   * 
   * @return {array} The array of error messages currently stored in PasswordService
   */
  getLastError: function () {
    var error = lastError;

    lastError = [];

    return error;
  },

  /**
   * Determines if a password meets the configured security
   * requirements for complexity.
   * 
   * @param  {string}  password     The submitted password
   * @param  {string}  confirmation The re-typed submitted password
   * @return {Boolean}              True if secure, false if not
   */
  isSecure: function (password, confirmation) {
    var matches = (password === confirmation),
      complexityErrors = getPasswordComplexityErrors(password),
      longEnough = (settings.minLength === 0 || password.length >= settings.minLength),
      shortEnough = (settings.maxLength === 0 || password.length <= settings.maxLength);

    lastError = (complexityErrors.length > 0) ? complexityErrors : [];

    if (!longEnough) {
      lastError.push('Password must contain at least ' + settings.minLength + ' characters');
    }

    if (!shortEnough) {
      lastError.push('Password may not contain more than ' + settings.maxLength + ' characters');
    }

    if (!matches) {
      lastError.push('Passwords do not match');
    }

    return matches && complexityErrors.length === 0 && longEnough && shortEnough; 
  },

  /**
   * Reset a user's password
   * 
   * @param  {string}  password The new password
   * @param  {User}    user     The user to update
   * @return {promise}          Error on fail
   */
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

  /**
   * Hash a user's password; use before saving to the
   * database.
   *
   * Centralized here to remain consistent when writing
   * user passwords for later verification on login.
   * 
   * @param  {string} password The password to hash
   * @return {string}          The hashed password
   */
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
  },

  /**
   * Validate a user's password
   * @param  {string} email    The email address for the given user
   * @param  {string} password The provided password to authenticate against the user's account
   * @return {bool}            True is valid, false if not
   */
  validatePassword: function (email, password) {}

};

