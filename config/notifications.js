
/**
 * Notification Settings
 * ---------------------
 *
 * Server rendered notification copy
 */

module.exports.notifications = {

  User: {
    error: {
      notFound: 'Could not find a user with that email address.',
      notVerified: function (email) {
        return 'You must verify your account before logging in. <a href="/resend?email=' + email + '">resend</a>';
      }
    }
  },

  SessionController: {
    error: {
      logoutError: 'There was an error logging you out',
      missingPassword: 'You must enter both a username and password.'
    }
  },

  PasswordService: {
    complexity: {
      error: {
        noLowercase: 'Password must contain at least one lowercase letter',
        noUppercase: 'Password must contain at least one uppercase letter',
        noNumber: 'Password must contain at least one number',
        noSpecial: 'Password must contain at least one special character',
      }
    },
    security: {
      error: {
        misMatch: 'Passwords do not match',
        notMinLength: function (length) {
          return 'Password must contain at least ' + length + ' characters';
        },
        notMaxLength: function (length) {
          return 'Password may not contain more than ' + length + ' characters';
        }
      }
    },
    validation: {
      error: {
        serverError: 'There was an error logging you in',
        invalidPassword: 'Invalid username and password combination.'
      }
    }
  }

};
