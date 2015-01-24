/*jslint node: true*/
/*globals List*/

/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Views
   */

  index: function (req, res) {
    res.view({ script: 'index' });
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

  /**
   * API
   */

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

  getLists: function (req, res) {

    List.find(function (err, lists) {
      if (err) {
        res.serverError(err);
      }

      res.json(lists);
    });
  },

  getListItems: function (req, res) {
    Item.find(function (err, items) {
      if (err) {
        res.serverError(err);
      }

      res.json(items);
    });
  }

};

