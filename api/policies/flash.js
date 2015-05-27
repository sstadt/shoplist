/**
 * flash
 *
 * @module      :: Policy
 * @description :: Simple policy to allow flash messaging
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function (req, res, next) {

  res.locals.flash = {};

  if (!req.session.flash) { return next(); }

  res.locals.flash = _.clone(req.session.flash);

  // clear flash
  req.session.flash = {
    vars: {},
    msg: {
      error: [],
      warning: [],
      success: []
    }
  };

  next();
};
