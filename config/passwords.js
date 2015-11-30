
/**
 * Password Settings
 * -----------------
 *
 * Used by the password service to determine 
 * complexity requirements.
 */

module.exports.passwords = {

  // (int) minimum character length
  //  - set to zero to remove minimum length
  minLength : 6,

  // (int) maximum character length
  //  - set to zero to remove maximum length
  maxLength : 20,

  // (bool) require lowercase
  lowerCase : true,

  // (bool) require uppercase
  upperCase : true,

  // (bool) require number
  number    : true,

  // (bool) require special character
  special   : false

};

