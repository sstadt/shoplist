/*jslint browser: true*/
/*globals define, confirm, alert, io*/

define([
  'lodash',
  'knockout',
  'ListItem',
  'text!./template.html'
], function (_, ko, ListItem, html) {
  'use strict';

  function convertToObservable(obj) {
    var newObj = {};
    Object.keys(obj).forEach(function (key) {
      newObj[key] = ko.observable(obj[key]);
    });
    return newObj;
  }

  function ListItemsViewModel(params) {

    // cache this to eliminate the need to pass context to jquery and lodash functions  
    var self = this;

    // item data
    self.listId = params.id;
    self.items = ko.observableArray([]);

    // new item data
    self.newItemName = ko.observable('');
    self.newItemQuantity = ko.observable(1);

    // errors
    self.pageError = ko.observable(null);
    self.formError = ko.observable(null);
    self.modalError = ko.observable(null);

    /**
     * Add a new list
     */
    // self.addList = function () {
    //   var newList = {
    //     name: self.newListName()
    //   };

    //   io.socket.post('/list/create', newList, function (response) {
    //     if (response.error) {
    //       self.formError(response.summary);
    //     } else {
    //       self.formError(null);
    //       self.lists.push(new ShoppingList(response));
    //       self.newListName('');
    //     }
    //   });
    // };

    // self.saveList = function () {
    //   var updatedList = {
    //     id: self.editListId(),
    //     name: self.editListName()
    //   };

    //   io.socket.post('/list/update', updatedList, function (response) {
    //     if (response.error) {
    //       self.modalError(response.summary);
    //     } else {
    //       var listIndex = _.findIndex(self.lists(), function (l) {
    //         return response.id === l.id;
    //       });

    //       self.modalError(null);

    //       self.lists.replace(self.lists()[listIndex], new ShoppingList(response));

    //       $('#editListModal').foundation('reveal', 'close', function () {
    //         self.editListName('');
    //         self.editListId('');
    //       });
    //     }
    //   });
    // };

    /**
     * Delete a list fromt the database
     * 
     * @param  {ShoppingList} The shopping list to delete 
     */
    // self.deleteList = function (list) {
    //   if (confirm("Are you sure you want to delete this list? This cannot be undone.")) {
    //     io.socket.post('/list/destroy', { id: list.id }, function (response) {
    //       if (response.error) {
    //         self.pageError(response.summary);
    //       } else {
    //         self.pageError(null);
    //         self.lists.destroy(list);
    //       }
    //     });
    //   }
    // };

    self.addItem = function () {
      var newListItem = {
        list: self.listId,
        name: self.newItemName(),
        quantity: self.newItemQuantity()
      };

      io.socket.post('/item/create', newListItem, function (response) {
        if (response.err) {
          self.formError(response.summary);
        } else {
          self.formError(null);
          self.pageError(null);
          self.items.push(convertToObservable(new ListItem(response)));
          self.newItemName('');
          self.newItemQuantity(1);
        }
      });
    };

    self.incrementItemQuantity = function (listItem) {
      var itemIndex = _.findIndex(self.items(), function (l) {
        return listItem.id === l.id;
      });

      self.items()[itemIndex].quantity(self.items()[itemIndex].quantity() + 1);
    };

    self.decrementItemQuantity = function (listItem) {
      var itemIndex = _.findIndex(self.items(), function (l) {
        return listItem.id === l.id;
      });

      if (self.items()[itemIndex].quantity() > 1) {
        self.items()[itemIndex].quantity(self.items()[itemIndex].quantity() - 1);
      }
    };

    self.incrementNewItemQuantity = function () {
      self.newItemQuantity(parseInt(self.newItemQuantity(), 10) + 1);
    };

    self.decrementNewItemQuantity = function () {
      if (self.newItemQuantity() > 1) {
        self.newItemQuantity(parseInt(self.newItemQuantity(), 10) - 1);
      }
    };

    /**
     * Populate the initial list
     */
    io.socket.get('/item/index', { list: self.listId }, function (response) {
      if (response.errror) {
        self.pageError(response.summary);
      } else {
        self.pageError(null);

        if (!_.isArray(response)) {
          self.pageError('No records found');

        } else if (response.length > 0) {
          self.items(response.map(function (item) {
            return convertToObservable(new ListItem(item));
          }));
        }
      }
    });

  } /* End of View Model */

  ko.components.register('page-alert', { require: 'components/alert-box/component' });
  ko.components.register('form-alert', { require: 'components/alert-box/component' });
  // ko.components.register('modal-alert', { require: 'components/alert-box/component' });

  return {
    viewModel: ListItemsViewModel,
    template: html
  };
});

