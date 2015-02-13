/*jslint node: true*/
/*globals User, FlashService, RegistrationService, Token*/

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

  verify: function (req, res) {
    Token.findOne({ token: req.param('token') }, function (err, token) {
      if (err) {
        FlashService.error(req, 'Error retrieving registration token');
        res.redirect('/login');
      }

      User.update(token.user, { confirmed: true }, function (err) {
        if (err) {
          FlashService.error(req, 'Could not activate your account at this time');
          res.redirect('/login');
        }

        Token.destroy(token.id, function () {
          FlashService.success(req, 'Account verified, you may now log in!');
          res.redirect('/login');
        });
      });
    });
  },

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
          .fail(function () {
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

