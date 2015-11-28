/*jslint node: true*/
/*globals sails, MailService, HttpService, Token*/

/**
 * Registration Service
 *
 * Contains functions related to user registration
 */

var sha1 = require('sha1'),
  Q = require('q'),
  protocol = 'http://',
  domain = sails.config.globals.baseurl[sails.config.environment],
  domainPath = protocol + sails.config.globals.baseurl[sails.config.environment];

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
        deferred.reject(err);
      }

      var pageData = {
        user: user,
        link: domainPath + '/reset?token=' + token.token
      };

      sails.hooks.views.render('email/resetpassword', pageData, function (err, html) {
        if (err) {
          deferred.reject(err);
        }

        var to = user.email,
          from = sails.config.email.noreply.address,
          password = sails.config.email.noreply.password,
          subject = 'Password Reset Request from ' + domain;

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

  // resolve with user
  // reject with error string
  validateResetToken: function (token) {
    var deferred = Q.defer();

    Token.findOne({ token: token }, function (err, token) {
      if (err || !token) {
        console.log('>>>>> Token.findOne >>>>');
        console.log(err);
        deferred.reject('There was an error validating your reset token.');
      } else {
        User.findOne({
          id: token.user,
          confirmed: false
        }, function (err, user) {
          if (err || !user) {
            console.log('>>>>> User.findOne fail >>>>');
            console.log(user);
            deferred.reject('There was an error validating your reset token.');
          } else {
            console.log('>>>>> User.findOne exist >>>>');
            console.log(user);
            deferred.resolve(user);
          }
            
        });
      }
    });

    return deferred.promise;
  }

};




