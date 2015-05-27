/*jslint node: true*/
/*globals User, FlashService*/

/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  'new': function (req, res) {
    res.view({
      title: 'login',
      script: 'public'
    });
  },

  create: function (req, res) {

    if (!req.param('email') || !req.param('password')) {
      FlashService.error('You must enter both a username and password.');
      res.redirect('/login');
    } else {

      User.findOne({ email: req.param('email') }, function (err, user) {
        if (err) {
          res.serverError('Error retrieving user');

        // If no user is found...
        } else if (!user) {
          FlashService.error(req, 'The email address ' + req.param('email') + ' was not found.');
          res.redirect('/login');

        // user is not confirmed
        } else if (user.confirmed !== true) {
          FlashService.warning(req, 'You must verify your account before logging in. <a href="/resend?email=' + req.param('email') + '">resend</a>');
          res.redirect('/login');

        } else {

          // Compare password from the form params to the encrypted password of the user found.
          bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
            if (err) {
              FlashService.error(req, 'There was an error logging you in');
              res.redirect('/login');

            // log user in
            } else if (valid === true) {
              req.session.authenticated = true;
              req.session.User = user.toJSON();
              res.redirect('/mylists');

            // If the password from the form doesn't match the password from the database...
            } else {
              FlashService.error(req, 'Invalid username and password combination.');
              res.redirect('/login');
            }
          });
        }
      });
    }

  },

  destroy: function (req, res) {
    User.findOne(req.session.User.id, function foundUser(err) {
      if (err) {
        res.serverError('Could not find user');
      } else {
        req.session.destroy();
        res.redirect('/login');
      }
    });
  }
};

