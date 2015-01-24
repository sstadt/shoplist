/*jslint browser: true*/
/*globals define, confirm, alert, io*/

define([
  'lodash',
  'knockout',
  'ShoppingList',
  'text!./template.html'
], function (_, ko, ShoppingList, html) {
  'use strict';

  function LinkListViewModel() {

    // cache this to eliminate the need to pass context to jquery and lodash functions  
    var self = this;

    // list data
    self.lists = ko.observableArray([]);
    self.editListName = ko.observable('');
    self.editListId = ko.observable();

    // new list data
    self.newListName = ko.observable('');

    // errors
    self.pageError = ko.observable(null);
    self.formError = ko.observable(null);
    self.modalError = ko.observable(null);

    /**
     * Add a new list
     */
    self.addList = function () {
      var newList = {
        name: self.newListName()
      };

      io.socket.post('/list/create', newList, function (response) {
        if (response.error) {
          self.formError(response.summary);
        } else {
          self.formError(null);
          self.lists.push(new ShoppingList(response));
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
      self.editListName(list.name);
      self.editListId(list.id);

      $('#editListModal').foundation('reveal', 'open');
    };

    self.saveList = function () {
      var updatedList = {
        id: self.editListId(),
        name: self.editListName()
      };

      io.socket.post('/list/update', updatedList, function (response) {
        if (response.error) {
          self.modalError(response.summary);
        } else {
          var listIndex = _.findIndex(self.lists(), function (l) {
            return response.id === l.id;
          });

          self.modalError(null);

          self.lists.replace(self.lists()[listIndex], new ShoppingList(response));

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
        io.socket.post('/list/destroy', { id: list.id }, function (response) {
          if (response.error) {
            self.pageError(response.summary);
          } else {
            self.pageError(null);
            self.lists.destroy(list);
          }
        });
      }
    };

    /**
     * Populate the initial list
     */
    io.socket.get('/list/getLists', function (response) {
      if (response.err) {
        self.pageError('Unable to retrieve lists');
      } else {
        self.pageError(null);

        if (response.length > 0) {
          self.lists(response.map(function (list) {
            return new ShoppingList(list);
          }));
        }
      }
    });

    ko.components.register('page-alert', { require: 'components/alert-box/component' });
    ko.components.register('form-alert', { require: 'components/alert-box/component' });
    ko.components.register('modal-alert', { require: 'components/alert-box/component' });

  } /* End of View Model */

  return {
    viewModel: LinkListViewModel,
    template: html
  };
});

