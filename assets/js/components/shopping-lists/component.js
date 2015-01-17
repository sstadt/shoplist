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

    /**
     * Add a new list
     */
    self.addList = function () {
      var newList = {
        name: self.newListName()
      };

      io.socket.post('/list/create', newList, function (response) {
        if (response.success) {
          self.lists.push(new ShoppingList(response.list));
          self.newListName('');
        } else {
          alert('error');
          console.log(response);
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
        if (response.success) {
          var listIndex = _.findIndex(self.lists(), function (l) {
            return response.list.id === l.id;
          });

          console.log(response);

          self.lists.replace(self.lists()[listIndex], new ShoppingList(response.list));

          $('#editListModal').foundation('reveal', 'close', function () {
            self.editListName('');
            self.editListId('');
          });
        } else {
          alert('error');
          console.log(response);
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
          if (response.success) {
            self.lists.destroy(list);
          } else {
            alert('error');
            console.log(response);
          }
        });
      }
    };

    /**
     * Populate the initial list
     */
    io.socket.get('/list/getLists', function (response) {
      if (response.success) {
        if (response.lists.length > 0) {
          self.lists(response.lists.map(function (list) {
            return new ShoppingList(list);
          }));
        }
      } else {
        alert('error');
        console.log(response);
      }
    });

  } /* End of View Model */

  return {
    viewModel: LinkListViewModel,
    template: html
  };
});

