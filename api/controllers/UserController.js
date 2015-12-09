/*jslint node: true*/
/*globals User, FlashService, RegistrationService, Token*/

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var userErrors = sails.config.notifications.User.error,
  userSuccesses = sails.config.notifications.User.success,
  tokenErrors = sails.config.notifications.Token.error;

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
        FlashService.error(req, tokenErrors.notFound('registration'));
        res.redirect('/login');
      }

      User.update(token.user, { confirmed: true }, function (err) {
        if (err) {
          FlashService.error(req, userErrors.cannotVerify);
          res.redirect('/login');
        }

        Token.destroy(token.id, function () {
          FlashService.success(req, userSuccesses.verified);
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
          var errorMsg = (err._e.code === 11000) ? userErrors.duplicateEmail : err._e.err;

          FlashService.warning(req, errorMsg);
          res.redirect('/register');
        } else {
          RegistrationService.generateValidationEmail(user)
            .then(function resolve() {
              FlashService.success(req, userSuccesses.verificationSent);
              res.redirect('/login');
            }, function reject() {
              FlashService.error(req, userErrors.cannotRegister);
              res.redirect('/register');
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
        FlashService.error(req, userErrors.notFound);
        res.redirect('/register');
      }

      Token.destroy({ user: user.id }, function (err) {
        if (err) {
          FlashService.error(req, tokenErrors.cannotResendValidation(user.email));
          res.redirect('/login');
        }

        RegistrationService.generateValidationEmail(user)
          .then(function resolve() {
            FlashService.success(req, userSuccesses.verificationSent);
            res.redirect('/login');
          }, function reject() {
            FlashService.error(req, userErrors.cannotRegister);
            res.redirect('/register');
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
        FlashService.error(req, userErrors.notFound);
        FlashService.addVar(req, 'email', email);
        res.redirect('/recover');
      }

      if (user === undefined) {
        FlashService.error(req, userErrors.notFound);
        FlashService.addVar(req, 'email', email);
        res.redirect('/recover');
      } else {
        RegistrationService.generateResetEmail(user)
          .then(function resolve() {
            FlashService.success(req, userSuccesses.passwordResetSent);
            res.redirect('/login');
          }, function reject(err) {
            FlashService.error(req, userErrors.cannotResetPassword);
            FlashService.addVar(req, 'email', email);
            res.redirect('/recover');
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
      .then(function resolve(user) {
        var errors;

        view.user = user;
        
        // a password was submitted for reset
        if (password || confirmation) {

          // password is secure according to configured rules
          if (PasswordService.isSecure(password, confirmation)) {
            PasswordService.resetPassword(password, user)
              .then(function resolve() {
                FlashService.success(req, userSuccesses.passwordReset);
                res.redirect('/login');
              }, function reject(err) {
                FlashService.error(req, userErrors.cannotResetPassword);
                FlashService.cycleFlash(req, res);
                res.view(view);
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

      }, function reject(err) {
        FlashService.error(req, err);
        res.redirect('/recover');
        return;
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

