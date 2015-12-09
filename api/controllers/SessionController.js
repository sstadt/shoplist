/*jslint node: true*/
/*globals User, FlashService*/

/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt'),
  sessionErrors = sails.config.notifications.SessionController.error;

module.exports = {

  'new': function (req, res) {
    res.view({
      title: 'login',
      script: 'public'
    });
  },

  create: function (req, res) {
    // TODO: cache email/password

    if (!req.param('email') || !req.param('password')) {
      FlashService.error(req, sessionErrors.missingPassword);
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
        res.serverError(sessionErrors.logoutError);
      } else {
        req.session.destroy();
        res.redirect('/login');
      }
    });
  }
};

