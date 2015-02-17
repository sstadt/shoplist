/*jslint node: true*/
/*globals List, Item*/

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

  create: function (req, res) {
    List.create({
      owner: req.session.User.id,
      name: req.param('name')
    }, function (err, list) {
      if (err) {
        res.serverError(err);
      }

      res.json(list);
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

  getLists: function (req, res) {
    List.find({
      owner: req.session.User.id
    }, function (err, lists) {
      if (err) {
        res.serverError(err);
      }

      res.json(lists);
    });
  },

  destroy: function (req, res) {
    var id = req.param('id');

    List.destroy(id, function (err) {
      if (err) {
        res.serverError(err);
      }

      Item.destroy({ list: id }, function (err) {
        if (err) {
          res.serverError(err);
        }

        res.send(200);
      });
    });
  },

  share: function (req, res) {
    var user = req.param('user'),
      listId = req.param('list');

    List.findOne(listId, function (err, list) {
      if (err) {
        res.serverError(err);
      }

      if (list.shared.indexOf(user) > -1) {
        res.serverError('List is already shared with this user.');
      } else {
        list.shared.push(user);
        List.update(list.id, list, function (err) {
          if (err) {
            res.serverError();
          }

          res.send(200);
        });
      }
    });
  }

};

