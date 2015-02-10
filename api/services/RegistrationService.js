/*jslint node: true*/
/*globals sails, MailService, HttpService*/

// TODO: Use a deferred to wait for this to finish

var sha1 = require('sha1');

module.exports = {

  generateValidationEmail: function (user) {

    var timestamp = new Date().getTime(),
      token = sha1(timestamp),
      data = {
        user: user,
        link: HttpService.getBaseUrl() + '/validate?token=' + token
      };

    sails.hooks.views.render('email/registration', data, function (err, html) {
      if (err) {
        console.log('error rendering view:');
        console.log(err);
        console.log('---------------------');
      } else {
        var to = user.email,
          from = sails.config.email.noreply.address,
          password = sails.config.email.noreply.password,
          subject = 'Registration Request from shoplist.scottstadt.com',
          message = html;

        MailService.send(to, from, password, subject, message, function (err) {
          if (err) {
            console.log('error sending mail:');
            console.log(err);
            console.log('-------------------');
          } else {
            console.log('success!');
          }
        });
      }

    });

    return false;
  }

};