/**
 * flash
 *
 * @module      :: Policy
 * @description :: Simple policy to allow flash messaging
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function (req, res, next) {
  FlashService.cycleFlash(req, res, next);
};
