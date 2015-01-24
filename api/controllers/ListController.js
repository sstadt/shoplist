/*jslint node: true*/
/*globals List*/

/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
    res.view({ script: 'index' });
  },

  getLists: function (req, res) {

    List.find(function (err, lists) {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      }

      res.json({
        success: true,
        lists: lists
      });
    });
  },

  show: function (req, res) {

    List.findOne(req.param('id'), function (err, list) {
      if (err) {
        res.serverError(err);
      }

      res.view({
        script: 'list',
        list: list
      });
    });
  },

  update: function (req, res) {
    var updatedList = {
      name: req.param('name')
    };

    List.update(req.param('id'), updatedList, function (err, list) {
      if (err) {
        res.serverError(err);
      }

      res.json(list[0]);
    });
  },

};

