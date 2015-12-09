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
      FlashService.error(req, 'You must enter both a username and password.');
      res.redirect('/login');
    } else {
      PasswordService.validatePassword(req.param('email'), req.param('password'))
        .then(function resolve(user) {
          req.session.authenticated = true;
          req.session.User = user.toJSON();
          res.redirect('/mylists');
        }, function reject(err) {
          FlashService.error(req, err);
          res.redirect('/login');
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

