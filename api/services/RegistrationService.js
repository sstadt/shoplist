/*jslint node: true*/
/*globals sails, MailService, HttpService, Token*/

/**
 * Registration Service
 *
 * Contains functions related to user registration
 */

var sha1 = require('sha1'),
  Q = require('q');

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
        link: 'http://shoplist.scottstadt.com/verify?token=' + token.token
      };

      sails.hooks.views.render('email/registration', pageData, function (err, html) {
        if (err) {
          deferred.reject(err);
        }

        var to = user.email,
          from = sails.config.email.noreply.address,
          password = sails.config.email.noreply.password,
          subject = 'Registration Request from shoplist.scottstadt.com',
          message = html;

        MailService.send(to, from, password, subject, message, function (err) {
          if (err) {
            deferred.reject(err);
          }

          deferred.resolve();
        });

      });

    });

    return deferred.promise;
  },

  generateResetEmail: function (user) {
    var deferred = Q.defer(),
      timestamp = new Date().getTime(),
      tokenStr = sha1(timestamp);

    setTimeout(function () {
      deferred.resolve();
    }, 0);

    return deferred.promise;
  }

};




