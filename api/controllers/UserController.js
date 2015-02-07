/*jslint node: true*/
/*globals User, FlashService*/

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

  confirmemail: function (req, res) {
    // future home of registration token validation
  },

  create: function (req, res) {
    var userObj = {
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    };

    User.create(userObj, function userCreated(err) {
      if (err) {
        var errorMsg = (err.code === 11000) ? 'There is already an account associated with that email address.' : err.err;

        FlashService.warning(req, errorMsg);
        res.redirect('/register');
      } else {
        FlashService.success(req, 'Account successfully created, you may now log in.');
        FlashService.success(req, 'In the future, you will be required to verify your email before logging in.');
        res.redirect('/login');
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

