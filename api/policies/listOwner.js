/*jslint node: true*/
/*globals List*/

/**
 * listOwner
 *
 * @module      :: Policy
 * @description :: Simple policy to allow flash messaging
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function (req, res, next) {

  List.findOne(req.param('list'), function (err, list) {
    if (err) {
      res.serverError(err);
    }

    if (list.owner !== req.session.User.id) {
      res.json({
        err: true,
        summary: 'You may not modify lists that have been created by other users.'
      });
    } else {
      next();
    }
  });
};
