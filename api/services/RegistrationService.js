/*jslint node: true*/
/*globals sails, MailService, HttpService, Token*/

// TODO: Use a deferred to wait for this to finish

var sha1 = require('sha1'),
  Q = require('q');

module.exports = {

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
        link: HttpService.getBaseUrl() + '/validate?token=' + token.token
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
  }

};