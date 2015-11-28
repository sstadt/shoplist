/**
 * flash
 *
 * @module      :: Policy
 * @description :: Simple policy to allow flash messaging
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
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

module.exports = function (req, res, next) {

  if (!req.session.flash) {
    res.locals.flash = new CleanFlash();
    return next();
  }

  res.locals.flash = _.clone(req.session.flash);

  // clear flash
  req.session.flash = new CleanFlash();

  next();
};
