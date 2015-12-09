/*jslint node: true*/
/*globals sails, MailService, HttpService, Token*/

/**
 * Registration Service
 *
 * Contains functions related to user functionality that
 * impacts accont usability and relays email messaging.
 *
 * Model Dependencies
 *   Token
 *
 * Service Dependencies
 *   MailService
 */

var sha1 = require('sha1'),
  Q = require('q'),
  protocol = 'http://',
  domain = sails.config.globals.baseurl[sails.config.environment],
  domainPath = protocol + sails.config.globals.baseurl[sails.config.environment],
  tokenErrors = sails.config.notifications.Token.error;

module.exports = {

  /**
   * Generate a validation email for a newly registered user
   *
   * @param  {object}  user The user to send a validation email to
   * @return {promise}
   */
  generateValidationEmail: function (user) {
    var deferred = Q.defer(),
      timestamp = new Date().getTime(),
      tokenStr = sha1(timestamp);

    Token.create({
      token: tokenStr,
      user: user.id
    }, function (err, token) {
      if (err) {
        deferred.reject(err);
      }

      var pageData = {
        user: user,
        link: domainPath + '/verify?token=' + token.token
      };

      sails.hooks.views.render('email/registration', pageData, function (err, html) {
        if (err) {
          deferred.reject(err);
        }

        var to = user.email,
          from = sails.config.email.noreply.address,
          password = sails.config.email.noreply.password,
          subject = 'Registration Request from ' + domain;

        MailService.send(to, from, password, subject, html, function (err) {
          if (err) {
            deferred.reject(err);
          }

          deferred.resolve();
        });

      });

    });

    return deferred.promise;
  },

  /**
   * Generate a password reset email
   * 
   * @param  {object} user The user to generate a reset email for
   * @return {promise}
   */
  generateResetEmail: function (user) {
    var deferred = Q.defer(),
      timestamp = new Date().getTime(),
      tokenStr = sha1(timestamp);

    Token.create({
      token: tokenStr,
      user: user.id
    }, function (err, token) {
      if (err) {
        return deferred.reject(err);
      }

      var pageData = {
        user: user,
        link: domainPath + '/reset?token=' + token.token
      };

      sails.hooks.views.render('email/resetpassword', pageData, function (err, html) {
        if (err) {
          return deferred.reject(err);
        }

        var to = user.email,
          from = sails.config.email.noreply.address,
          password = sails.config.email.noreply.password,
          subject = 'Password Reset Request from ' + domain;

        MailService.send(to, from, password, subject, html, function (err) {
          if (err) {
            return deferred.reject(err);
          }

          deferred.resolve();
        });

      });

    });

    return deferred.promise;
  },

  /**
   * Validate a token as a password reset token
   * @param  {string} token The token to validate
   * @return {promise}      Passes a single argument; error string on fail, user object on pass
   */
  validateResetToken: function (token) {
    var deferred = Q.defer();

    Token.findOne({ token: token }, function (err, token) {
      if (err || !token) {
        deferred.reject(tokenErrors.notFound('password reset'));
      } else {
        User.findOne({
          id: token.user,
          confirmed: true
        }, function (err, user) {
          if (err || !user) {
            deferred.reject(tokenErrors.notFound('password reset'));
          } else {
            deferred.resolve(user);
          }
        });
      }
    });

    return deferred.promise;
  }

};




