/*jslint node: true*/
/*globals sails*/

/**
 * Flash Service
 *
 * Adds flash messaged to req.session.flash for display in alert boxes on the front end
 */

/**
 * Update a flash message type with a new message
 *
 * @param  {string} type The message type to update; error, warning, or success
 * @param  {object} req  The Express request object
 * @param  {string} msg  The message to add to the flash variable
 */
function updateMessageType(type, req, msg) {
  if (!req.session.flash) {
    req.session.flash = { msg: {} };
    req.session.flash.msg[type] = [msg];
  } else if (req.session.flash.msg[type]) {
    req.session.flash.msg[type].push(msg);
  } else {
    req.session.flash.msg[type] = [msg];
  }
}

module.exports = {

  addVar: function (req, key, val) {
    if (!req.session.flash) {
      req.session.flash = { vars: {} };
    }
    if (!req.session.flash.vars) {
      req.session.flash.vars = {};
    }
    req.session.flash.vars[key] = val;
  },

  /**
   * Add error message
   *
   * @param  {object} req Express request object
   * @param  {string} msg The message to add to the error list
   */
  error: function (req, msg) {
    updateMessageType('error', req, msg);
  },

  /**
   * Add warning message
   *
   * @param  {object} req Express request object
   * @param  {string} msg The message to add to the warning list
   */
  warning: function (req, msg) {
    updateMessageType('warning', req, msg);
  },

  /**
   * Add success message
   *
   * @param  {object} req Express request object
   * @param  {string} msg The message to add to the success list
   */
  success: function (req, msg) {
    updateMessageType('success', req, msg);
  }
};