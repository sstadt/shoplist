/*jslint node: true*/
/*globals Item*/

/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * API
   */

  index: function (req, res) {
    Item.find({ list: req.param('list') }, function (err, items) {
      if (err) {
        res.serverError(err);
      }

      res.json(items);
    });
  },

  toggle: function (req, res) {
    Item.update({ id: req.param('id') }, {
      checked: !req.param('checked')
    }, function (err, item) {
      if (err) {
        res.serverError(err);
      }

      res.json(item);
    });
  },

  update: function (req, res) {
    Item.update({ id: req.param('id') }, {
      name: req.param('name'),
      quantity: req.param('quantity')
    }, function (err) {
      if (err) {
        res.serverError(err);
      }

      res.send(200);
    });
  }

};

