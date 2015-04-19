/*jslint node: true*/
/*globals List, Item*/

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
    var listId = req.param('list');

    List.find(listId, function (err, list) {
      if (err) {
        res.serverError(err);
      }

      List.subscribe(req.socket, list);

      Item.find({ list: listId }, function (err, items) {
        if (err) {
          res.serverError(err);
        }

        res.json(items);
      });
    });
  },

  create: function (req, res) {
    var newItem = {
      list: req.param('list'),
      name: req.param('name'),
      quantity: req.param('quantity')
    };

    Item.create(newItem, function (err, item) {
      if (err) {
        res.json(err);
      }

      List.message(item.list, {
        verb: 'addItem',
        item: item
      });

      res.json(item);
    });
  },

  toggle: function (req, res) {
    Item.update({ id: req.param('id') }, {
      checked: !req.param('checked')
    }, function (err, item) {
      if (err) {
        res.serverError(err);
      }

      List.message(item[0].list, {
        verb: 'updateItem',
        item: item[0]
      });

      res.json(item);
    });
  },

  update: function (req, res) {
    Item.update({ id: req.param('id') }, {
      name: req.param('name'),
      quantity: req.param('quantity')
    }, function (err, item) {
      if (err) {
        res.serverError(err);
      }

      List.message(item[0].list, {
        verb: 'updateItem',
        item: item[0]
      });

      res.send(200);
    });
  },

  destroyChecked: function (req, res) {
    var listId = req.param('list');

    Item.destroy({
      list: listId,
      checked: true
    }, function (err) {
      if (err) {
        res.serverError(err);
      }

      List.message(listId, {
        verb: 'clearChecked'
      });
    });
  },

};

