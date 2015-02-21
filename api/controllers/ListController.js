/*jslint node: true*/
/*globals List, Item, User*/

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
      or: [
        { owner: req.session.User.id },
        { shared: req.session.User.id }
      ]
    }, function (err, lists) {
      if (err) {
        res.serverError(err);
      }

      var shoppingLists = {
        owned: _.filter(lists, function (list) {
          return list.owner === req.session.User.id;
        }),
        shared: _.filter(lists, function (list) {
          return list.shared.indexOf(req.session.User.id) > -1; 
        })
      };

      res.json(shoppingLists);
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
        res.json({
          err: true,
          summary: list.name + ' is already shared with this user.'
        });
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
  },

  unshare: function (req, res) {
    var user = req.param('user'),
      listId = req.param('list');

    List.findOne(listId, function (err, list) {
      if (err) {
        res.serverError(err);
      }

      var index = list.shared.indexOf(user);

      if (index < 0) {
        res.json({
          err: true,
          summary: list.name + ' has not been shared with this user'
        });
      } else {
        list.shared.splice(index, 1);
        List.update(list.id, list, function (err) {
          if (err) {
            res.serverError(err);
          }

          res.send(200);
        });
      }
    });
  },

  getShared: function (req, res) {
    var listId = req.param('list');

    List.findOne(listId, function (err, list) {
      if (err) {
        res.serverError(err);
      }

      User.find({
        id: list.shared
      }, function (err, users) {
        if (err) {
          res.serverError(err);
        }

        res.json(users.map(function (user) {
          return user.toJSON();
        }));
      });
    });
  }

};

