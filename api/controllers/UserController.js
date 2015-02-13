/*jslint node: true*/
/*globals User, FlashService, RegistrationService*/

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view({
      title: 'register',
      script: 'public'
    });
  },

  // confirmemail: function (req, res) {
  //   // future home of registration token validation
  // },

  create: function (req, res) {
    var userObj = {
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    };

    User.create(userObj, function userCreated(err, user) {
      if (err) {
        var errorMsg = (err._e.code === 11000) ? 'There is already an account associated with that email address.' : err._e.err;

        FlashService.warning(req, errorMsg);
        res.redirect('/register');
      } else {
        RegistrationService.generateValidationEmail(user)
          .fail(function (err) {
            FlashService.error(req, 'Unable to create a registration key at this time');
            res.redirect('/register');
          })
          .done(function () {
            FlashService.success(req, 'Check the email address you registered with to verify your account.');
            res.redirect('/login');
          });
      }
    });
  },

  show: function (req, res) {
    res.view({
      title: 'profile',
      script: 'public'
    });
  }
};

