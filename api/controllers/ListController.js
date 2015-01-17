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
    res.view({ script: 'app' });
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
        script: 'app',
        list: list
      });
    });
  },

  create: function (req, res) {
    var newList = {
      name: req.param('name')
    };

    List.create(newList, function (err, list) {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      }

      res.json({
        success: true,
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
        res.json({
          success: false,
          error: err
        });
      }

      res.json({
        success: true,
        list: list[0]
      });
    });
  },

  destroy: function (req, res) {
    List.destroy(req.param('id'), function (err) {
      if (err) {
        res.json({
          success: true,
          error: err
        });
      }

      res.json({
        success: true
      });
    });
  }

};

