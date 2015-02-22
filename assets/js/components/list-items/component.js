/*jslint browser: true*/
/*globals define, confirm, alert, io*/

define([
  'lodash',
  'knockout',
  'koutil',
  'ListItem',
  'text!./template.html',
  'components/alert-box/component',
  'components/overlay-loader/component'
], function (_, ko, koutil, ListItem, html, AlertBox, OverlayLoader) {
  'use strict';

  function sortChecked(p, c) {
    if (p.checked() === false && c.checked() === true) {
      return -1;
    }

    if (p.checked() === true && c.checked() === false) {
      return 1;
    }

    // both checked ur unchecked, filter alphabetically
    return (p.name() > c.name()) ? 1 : -1;
  }

  function ListItemsViewModel(params) {

    // cache this to eliminate the need to pass context to jquery and lodash functions  
    var self = this;

    // item data
    self.listId = params.id;
    self.items = ko.observableArray([]);
    self.selectedItem = ko.observable();

    // new item data
    self.newItemName = ko.observable('');

    // errors
    self.pageError = ko.observable(null);
    self.formError = ko.observable(null);
    self.modalError = ko.observable(null);

    // interface
    self.loading = ko.observable(true);

    self.addItem = function () {
      var newListItem = {
        list: self.listId,
        name: self.newItemName(),
        quantity: 1
      };

      io.socket.post('/item/create', newListItem, function (response) {
        if (response.err) {
          self.formError(response.summary);
        } else {
          self.formError(null);
          self.pageError(null);
          self.newItemName('');
          self.newItemQuantity(1);
        }
      });
    };

    self.incrementSelectedItemQuantity = function () {
      self.selectedItem().quantity(self.selectedItem().quantity() + 1);
    };

    self.decrementSelectedItemQuantity = function () {
      if (self.selectedItem().quantity() > 1) {
        self.selectedItem().quantity(self.selectedItem().quantity() - 1);
      }
    };

    self.incrementNewItemQuantity = function () {
      self.newItemQuantity(parseInt(self.newItemQuantity(), 10) + 1);
    };

    self.decrementNewItemQuantity = function () {
      var quantity = parseInt(self.newItemQuantity(), 10);

      if (quantity > 1) {
        self.newItemQuantity(quantity - 1);
      }
    };

    self.toggleChecked = function (listItem) {
      io.socket.post('/item/toggle', {
        id: listItem.id,
        checked: listItem.checked()
      }, function (response) {
        if (response.err) {
          self.pageError(response.summary);
        } else {
          self.pageError(null);
        }
      });
    };

    self.removeItem = function (listItem) {
      io.socket.post('/item/destroy', { id: listItem.id }, function (response) {
        if (response.errror) {
          self.pageerror(response.summary);
        } else {
          self.pageError(null);
          self.items.destroy(listItem);
        }
      });
    };

    self.editItem = function (listItem) {
      self.selectedItem(listItem);
      $('#editItemModal').foundation('reveal', 'open');
    };

    self.saveItem = function () {
      var updatedListItem = {
        id: self.selectedItem().id,
        name: self.selectedItem().name(),
        quantity: self.selectedItem().quantity()
      };

      io.socket.post('/item/update', updatedListItem, function (response) {
        $('#editItemModal').foundation('reveal', 'close');

        if (response.error) {
          self.modalError(response.summary);
        } else {
          self.modalError(null);
        }
      });
    };

    /**
     * List updates from other users
     */
    self.socketActions = {
      addItem: function (item) {
        self.items.push(new ListItem(item));
      },
      updateItem: function (itemIndex, item) {
        self.items()[itemIndex].name(item.name);
        self.items()[itemIndex].quantity(item.quantity);
        self.items()[itemIndex].checked(item.checked);
        self.items.sort(sortChecked);
      },
      destroyItem: function (itemIndex) {
        self.items.destroy(self.items()[itemIndex]);
      }
    };

    /**
     * Listen for list updates to items
     */
    io.socket.on('list', function (response) {
      var itemIndex = koutil.getItemIndexById(response.data.item.id, self.items()),
        verb = (response.verb === 'messaged') ? response.data.verb : response.verb;

      if (verb === 'addItem' && self.socketActions.hasOwnProperty(verb)) {
        self.socketActions.addItem(response.data.item);
      } else if (self.socketActions.hasOwnProperty(verb)) {
        self.socketActions[verb](itemIndex, response.data.item);
      }
    });

    /**
     * Populate the initial list
     */
    console.log('getting data');
    io.socket.get('/item/index', { list: self.listId }, function (response) {
      self.loading(false);
      console.log(response);

      if (response.errror) {
        self.pageError(response.summary);
      } else {
        self.pageError(null);

        if (!_.isArray(response)) {
          self.pageError('No records found');

        } else if (response.length > 0) {
          self.items(response.map(function (item) {
            return new ListItem(item);
          }));
          self.items.sort(sortChecked);
        }
      }
    });

  } /* End of View Model */

  ko.components.register('page-alert', AlertBox);
  ko.components.register('form-alert', AlertBox);
  ko.components.register('modal-alert', AlertBox);
  ko.components.register('overlay-loader', OverlayLoader);

  return {
    viewModel: ListItemsViewModel,
    template: html
  };
});

