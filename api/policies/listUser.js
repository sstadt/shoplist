/*jslint node: true*/
/*globals List*/

/**
 * listUser
 *
 * @module      :: Policy
 * @description :: A policy for restricting list item updates to list users
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function (req, res, next) {

  List.findOne(req.param('list'), function (err, list) {
    if (err) {
      res.serverError(err);
    }

    if (list.owner === req.session.User.id || list.shared.indexOf(req.session.User.id) > -1) {
      next();
    } else {
      res.json({
        error: true,
        summary: 'You may not modify lists that you do not have access to.'
      });
    }
  });
};
