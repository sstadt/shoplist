/*jslint node: true*/
/*globals sails*/

/**
 * Flash Service
 * -------------
 *
 * Controls flash messaging on templates that include the
 * flash message template.
 */

/**
 * CleanFlash Class
 *
 * Used on flash cycling to initialize a clean set of flash
 * variable.
 */
function CleanFlash() {
  this.vars = {
    email: ''
  };
  this.msg = {
    error: [],
    warning: [],
    success: []
  };
}

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

  /**
   * Cycle the flash variable. Useful for when you want to
   * set flash variables without navigating to another
   * endpoint.
   * 
   * @param  {object}   req  The current express request object
   * @param  {object}   res  The current express response object
   * @param  {Function} next The current express callback function
   * @return {void}
   */
  cycleFlash: function (req, res, next) {
    if (!req.session.flash) {
      res.locals.flash = new CleanFlash();
      if (typeof next === 'function') return next();
      return;
    }

    res.locals.flash = _.clone(req.session.flash);

    // clear flash
    req.session.flash = new CleanFlash();

    if (typeof next === 'function') next();
  },

  /**
   * Add a custom value to flash
   * 
   * @param {object} req The current express request object
   * @param {string} key The key of the value to store
   * @param {mixed}  val The value to store
   */
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
   * Add error message to flash
   *
   * @param  {object} req Express request object
   * @param  {string} msg The message to add to the error list
   */
  error: function (req, msg) {
    updateMessageType('error', req, msg);
  },

  /**
   * Add warning message to flash
   *
   * @param  {object} req Express request object
   * @param  {string} msg The message to add to the warning list
   */
  warning: function (req, msg) {
    updateMessageType('warning', req, msg);
  },

  /**
   * Add success message to flash
   *
   * @param  {object} req Express request object
   * @param  {string} msg The message to add to the success list
   */
  success: function (req, msg) {
    updateMessageType('success', req, msg);
  }
};