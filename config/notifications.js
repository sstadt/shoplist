
/**
 * Notification Settings
 * ---------------------
 *
 * Server rendered notification copy
 */

module.exports.notifications = {

  User: {
    success: {
      passwordReset: 'Your password was successfully reset!',
      passwordResetSent: 'Success! Check your email for instruction to reset your password.',
      verificationSent: 'Check the email address you registered with to verify your account.',
      verified: 'Account verified, you may now log in!'
    },
    error: {
      cannotResetPassword: 'Unable to reset your password at this time',
      cannotRegister: 'Registration could not be completed at this time.',
      notFound: 'Could not find a user with that email address.',
      cannotVerify: 'Could not activate your account at this time',
      duplicateEmail: 'There is already an account associated with that email address.',
      notVerified: function (email) {
        return 'You must verify your account before logging in. <a href="/resend?email=' + email + '">resend</a>';
      }
    }
  },

  Token: {
    error: {
      cannotResendValidation: function (email) {
        return 'Error creating validation key. <a href="/resend?email=' + email + '">retry</a>';
      },
      notFound: function (type) {
        return 'Error retrieving ' + type + ' key';
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
  },

  RegistrationService: {
    error: {
      
    }
  }

};
