/*jslint browser: true*/
/*globals define, confirm, alert, io*/

/**
 * ListItems
 *
 * Displays a list of all the items contained int a shopping list
 */

define([
  'jquery',
  'lodash',
  'knockout',
  'koutil',
  'ListItem',
  'text!./template.html',
  'components/alert-box/component',
  'components/overlay-loader/component',
  'sails'
], function ($, _, ko, koutil, ListItem, html, AlertBox, OverlayLoader) {
  'use strict';

  /**
   * Sort the list by checked items
   *
   * @param  {object}  previous The previous list to sort
   * @param  {object}  current  The current list to sort
   * @return {integer}          The direction to sort the current set of lists
   */
  function sortChecked(previous, current) {
    if (previous.checked() === false && current.checked() === true) {
      return -1;
    }

    if (previous.checked() === true && current.checked() === false) {
      return 1;
    }

    // both checked ur unchecked, filter alphabetically
    return (previous.name() > current.name()) ? 1 : -1;
  }

  /**
   * Determine if an item is checked or not
   *
   * @param  {object}  item The item to check
   * @return {Boolean}      True if checked, false if not
   */
  function isItemChecked(item) {
    return item.checked();
  }

  /**
   * Get the number of checked items
   *
   * @param  {array}   items The array of items to check
   * @return {integer}       The number of checked items in the array
   */
  function getNumCheckedItems(items) {
    return _.filter(items, function (item) {
      return item.checked();
    }).length;
  }

  /**
   * ListItemsViewModel
   */
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
    self.checkedItems = ko.observable(false);

    self.items.subscribe(function (items) {
      self.checkedItems(getNumCheckedItems(items) > 0);
    });

    /**
     * Add an item to the list
     */
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
        }
      });
    };

    /**
     * Increment the quantity of an item in the list
     */
    self.incrementSelectedItemQuantity = function () {
      self.selectedItem().quantity(self.selectedItem().quantity() + 1);
    };

    /**
     * Decrement the quantity of an item in the list
     */
    self.decrementSelectedItemQuantity = function () {
      if (self.selectedItem().quantity() > 1) {
        self.selectedItem().quantity(self.selectedItem().quantity() - 1);
      }
    };

    /**
     * Toggle an item's checked property
     */
    self.toggleChecked = function (listItem) {
      io.socket.post('/item/toggle', {
        list: self.listId,
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

    /**
     * Clear all checked items from the list
     */
    self.clearCheckedItems = function () {
      if (confirm('Are you sure you want to remove all checked items?')) {
        io.socket.post('/destroyCheckedItems', { list: self.listId }, function (response) {
          if (response.err) {
            self.pageerror(response.summary);
          } else {
            self.pageError(null);
            self.checkedItems(false);
          }
        });
      }
    };

    /**
     * Open the edit item modal
     */
    self.editItem = function (listItem) {
      self.selectedItem(listItem);
      $('#editItemModal').foundation('reveal', 'open');
    };

    /**
     * Save an edited item
     */
    self.saveItem = function () {
      var updatedListItem = {
        list: self.listId,
        id: self.selectedItem().id,
        name: self.selectedItem().name(),
        quantity: self.selectedItem().quantity()
      };

      io.socket.post('/item/update', updatedListItem, function (response) {
        $('#editItemModal').foundation('reveal', 'close');

        if (response.err) {
          self.modalError(response.summary);
        } else {
          self.modalError(null);
        }
      });
    };

    /**
     * List updates
     */
    self.socketActions = {
      addItem: function (item) {
        self.items.push(new ListItem(item));
        self.items.sort(sortChecked);
      },
      updateItem: function (itemIndex, item) {
        self.items()[itemIndex].name(item.name);
        self.items()[itemIndex].quantity(item.quantity);
        self.items()[itemIndex].checked(item.checked);
        self.items.sort(sortChecked);
      },
      clearChecked: function () {
        _.forEach(_.filter(self.items(), isItemChecked), function (item) {
          self.items.destroy(item);
        });
      }
    };

    /**
     * Listen for list updates to items
     */
    io.socket.on('list', function (response) {
      var verb = (response.verb === 'messaged') ? response.data.verb : response.verb,
        itemIndex;

      if (verb === 'addItem' && self.socketActions.hasOwnProperty(verb)) {
        self.socketActions.addItem(response.data.item);
      } else if (verb === 'clearChecked' && self.socketActions.hasOwnProperty(verb)) {
        self.socketActions.clearChecked();
      } else if (self.socketActions.hasOwnProperty(verb)) {
        itemIndex = koutil.getItemIndexById(response.data.item.id, self.items());
        self.socketActions[verb](itemIndex, response.data.item);
      }
    });

    /**
     * Populate the initial list
     */
    io.socket.get('/item/index', { list: self.listId }, function (response) {
      self.loading(false);

      if (response.err) {
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

    // initialize child components
    ko.components.register('page-alert', AlertBox);
    ko.components.register('form-alert', AlertBox);
    ko.components.register('modal-alert', AlertBox);
    ko.components.register('overlay-loader', OverlayLoader);

  } /* End of View Model */

  return {
    viewModel: ListItemsViewModel,
    template: html
  };
});

