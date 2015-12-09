/*jslint node: true*/
/*globals User, FlashService, RegistrationService, Token*/

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  splash: function (req, res) {
    res.view({
      title: 'splash',
      script: 'public'
    });
  },

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

    if (PasswordService.isSecure(userObj.password, userObj.confirmation)) {
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
    } else {
      _.each(PasswordService.getLastError(), function (error) {
        FlashService.error(req, error);
      });
      FlashService.addVar(req, 'email', userObj.email);
      res.redirect('/register');
    }
  },

  resend: function (req, res) {
    User.findOne({ email: req.param('email') }, function (err, user) {
      if (err) {
        FlashService.error(req, 'Could not find a user with that email address.');
        res.redirect('/register');
      }

      Token.destroy({ user: user.id }, function (err) {
        if (err) {
          FlashService.error(req, 'Error creating validation token. <a href="/resend?email=' + user.email + '">retry</a>');
          res.redirect('/login');
        }

        RegistrationService.generateValidationEmail(user)
          .fail(function () {
            FlashService.error(req, 'Unable to create a registration key at this time');
            res.redirect('/register');
          })
          .done(function () {
            FlashService.success(req, 'Check the email address you registered with to verify your account.');
            res.redirect('/login');
          });
      });
    });
  },

  recoverPassword: function (req, res) {
    res.view({
      title: 'recover password',
      script: 'public',
      email: req.param('email') || '',
      success: req.param('success')
    });
  },

  sendResetEmail: function (req, res) {
    var email = req.param('email'),
      defaultView = { title: 'recover password', script: 'public', email: email || '' };

    User.findOne({ email: email }, function (err, user) {
      if (err || user === undefined) {
        FlashService.error(req, 'Could not find a user with that email address.');
        FlashService.addVar(req, 'email', email);
        res.redirect('/recover');
      }

      if (user === undefined) {
        FlashService.error(req, 'Could not find a user with that email address.');
        FlashService.addVar(req, 'email', email);
        res.redirect('/recover');
      } else {
        RegistrationService.generateResetEmail(user)
          .fail(function () {
            FlashService.error(req, 'Unable to reset your password at this time');
            FlashService.addVar(req, 'email', email);
            res.redirect('/recover');
          })
          .done(function () {
            FlashService.success(req, 'Success! Check your email for instruction to reset your password.');
            res.redirect('/login');
          });
      }
    });
  },

  resetPassword: function (req, res) {
    var token = req.param('token') || '',
      password = req.param('password'),
      confirmation = req.param('confirmation'),
      view = {
        token: token,
        user: { email: '' },
        title: 'reset password',
        script: 'public'
      };

    RegistrationService.validateResetToken(token)
      .fail(function (err) {
        FlashService.error(req, err);
        res.redirect('/recover');
        return;
      })
      .done(function (user) {
        var errors;

        view.user = user;
        
        // a password was submitted for reset
        if (password || confirmation) {

          // password is secure according to configured rules
          if (PasswordService.isSecure(password, confirmation)) {
            PasswordService.resetPassword(password, user)
              .fail(function (err) {
                FlashService.error(req, 'There was an error resetting your password');
                FlashService.cycleFlash(req, res);
                res.view(view);
              })
              .done(function () {
                FlashService.success(req, 'Your password was successfully reset!');
                res.redirect('/login');
              });

          // password is not secure
          } else {
            errors = PasswordService.getLastError();
            for (var i = 0, j = errors.length; i < j; i++) {
              FlashService.error(req, errors[i]);
            }
            FlashService.cycleFlash(req, res);

            res.view(view);  
          }

        // a password was not submitted for reset
        } else {
          res.view(view);          
        }

      });
  },

  show: function (req, res) {
    res.view({
      title: 'profile',
      script: 'public'
    });
  },

  search: function (req, res) {
    User.find({
      id: { '!': req.session.User.id },
      email: { startsWith: req.param('email') }
    }, function userFound(err, users) {
      if (err) {
        res.serverError(err);
      }

      res.json(users.map(function (user) {
        return user.toJSON();
      }));
    });
  }
};

