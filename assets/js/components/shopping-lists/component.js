/*jslint browser: true*/
/*globals define, confirm, alert, io*/

/**
 * ShoppingLists
 *
 * Displays a list of owned and shared shopping lists
 */

define([
  'knockout',
  'koutil',
  'ShoppingList',
  'text!./template.html',
  'components/alert-box/component',
  'components/overlay-loader/component',
  'sails'
], function (ko, koutil, ShoppingList, html, AlertBox, OverlayLoader) {
  'use strict';

  /**
   * Create a new shopping list object
   *
   * @param  {object} list The list data to create the list with
   * @return {List}        The created list
   */
  function newShoppingList(list) {
    return new ShoppingList(list);
  }

  /**
   * ShoppingListsViewModel
   */
  function ShoppingListsViewModel() {

    // cache this to eliminate the need to pass context to jquery and lodash functions  
    var self = this;

    // list data
    self.lists = ko.observableArray([]);
    self.sharedLists = ko.observableArray([]);
    self.editListName = ko.observable('');
    self.editListId = ko.observable();

    // new list data
    self.newListName = ko.observable('');

    // errors
    self.pageError = ko.observable(null);
    self.formError = ko.observable(null);
    self.modalError = ko.observable(null);

    // interface
    self.loading = ko.observable(true);
    self.addingItem = ko.observable(false);
    self.savingList = ko.observable(false);

    /**
     * Add a new list
     */
    self.addList = function () {
      var newList = {
        name: self.newListName()
      };

      self.addingItem(true);

      io.socket.post('/list/create', newList, function (response) {
        self.addingItem(false);

        if (response.err) {
          self.formError(response.summary);
        } else {
          self.formError(null);
          self.lists.push(newShoppingList(response));
          self.newListName('');
        }
      });
    };

    /**
     * Edit the title of a list
     * 
     * @param  {ShoppingList} The shopping list to set a new title for
     */
    self.editListTitle = function (list) {
      self.editListName(list.name());
      self.editListId(list.id);

      $('#editListModal').foundation('reveal', 'open');
    };

    /**
     * Update an existing shopping list
     */
    self.saveList = function () {
      var updatedList = {
        list: self.editListId(),
        name: self.editListName()
      };

      self.savingList(true);

      io.socket.post('/list/update', updatedList, function (response) {
        self.savingList(false);

        if (response.err) {
          self.modalError(response.summary);
        } else {
          self.modalError(null);

          $('#editListModal').foundation('reveal', 'close', function () {
            self.editListName('');
            self.editListId('');
          });
        }
      });
    };

    /**
     * Delete a list fromt the database
     * 
     * @param  {ShoppingList} The shopping list to delete 
     */
    self.deleteList = function (list) {
      if (confirm("Are you sure you want to delete this list? This cannot be undone.")) {
        list.loading(true);

        io.socket.post('/list/destroy', { list: list.id }, function (response) {
          list.loading(false);

          if (response.err) {
            self.pageError(response.summary);
          } else {
            self.pageError(null);
            self.lists.remove(list);
          }
        });
      }
    };

    /**
     * List updates from other users
     */
    self.socketActions = {
      updated: function (listIndex, lists, data) {
        lists()[listIndex].name(data.name);
      },
      destroyed: function (listIndex, lists) {
        lists.remove(self.sharedLists()[listIndex]);
      }
    };

    /**
     * Listen for list updates
     */
    io.socket.on('list', function (response) {
      var myListIndex = koutil.getItemIndexById(response.id, self.lists()),
        listIndex = (myListIndex === -1) ? koutil.getItemIndexById(response.id, self.sharedLists()) : myListIndex,
        lists = (myListIndex === -1) ? self.sharedLists : self.lists;

      if (self.socketActions.hasOwnProperty(response.verb)) {
        self.socketActions[response.verb](listIndex, lists, response.data);
      }
    });

    /**
     * Populate the initial list
     */
    io.socket.get('/list/getLists', function (response) {
      if (response.err) {
        self.pageError('Unable to retrieve lists');
      } else {
        self.pageError(null);

        if (response.owned) {
          self.lists(response.owned.map(newShoppingList));
        }

        if (response.shared) {
          self.sharedLists(response.shared.map(newShoppingList));
        }
      }

      self.loading(false);
    });

    // initialize child components
    ko.components.register('page-alert', AlertBox);
    ko.components.register('form-alert', AlertBox);
    ko.components.register('modal-alert', AlertBox);
    ko.components.register('overlay-loader', OverlayLoader);

  } /* End of View Model */

  return {
    viewModel: ShoppingListsViewModel,
    template: html
  };
});

