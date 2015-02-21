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

  List.findOne(req.param('id'), function (err, list) {
    if (err) {
      res.serverError(err);
    }

    if (list.owner !== req.session.User.id) {
      res.json({
        error: true,
        summary: 'You may not delete lists that have been created by other users.'
      });
    } else {
      next();
    }
  });
};
