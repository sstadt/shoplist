/*jslint browser: true*/
/*globals define, io*/

/**
 * ListUsers
 *
 * Displays the users that a list is shared with
 */

define([
  'knockout',
  'SharedUser',
  'text!./template.html',
  'components/alert-box/component',
  'sails'
], function (ko, SharedUser, html, AlertBox) {

  /**
   * ListUsersViewModel
   */
  function ListUsersViewModel(params) {
    var self = this;

    // user data
    self.listId = params.id;
    self.listName = params.name;
    self.searchParam = ko.observable('');
    self.listUsers = ko.observableArray([]);

    // interface data
    self.error = ko.observable('test');
    self.searching = ko.observable(false);
    self.searchResults = ko.observableArray([]);

    // subscribe to searchParam to show users the list can be shared with
    self.searchParam.subscribe(function (search) {
      if (search.length > 2 && !self.searching()) {
        self.searching(true);

        io.socket.get('/userSearch', {
          list: self.listId,
          email: search
        }, function (users) {
          self.searching(false);

          if (users.err) {
            self.error(users.summary);
          } else {
            self.error(null);
            self.searchResults(users.map(function (user) {
              return new SharedUser(user);
            }));
          }
        });
      }
    });

    /**
     * Add a user to the shared list
     *
     * @param {object} user The user the list should be shared with
     */
    self.shareList = function (user) {
      user.loading(true);

      io.socket.post('/shareList', {
        list: self.listId,
        user: user.id
      }, function (response) {
        user.loading(false);

        if (response.err) {
          self.error(response.summary);
        } else {
          self.error(null);
          self.listUsers.push(user);
          self.searchResults.destroy(user);
        }
      });
    };

    /**
     * Remove a user from the shared list
     * @param {object} user The user the list should no longer be shared with
     */
    self.unshareList = function (user) {
      user.loading(true);

      io.socket.post('/unshareList', {
        list: self.listId,
        user: user.id
      }, function (response) {
        user.loading(false);

        if (response.err) {
          self.error(response.summary);
        } else {
          self.listUsers.destroy(user);
        }
      });
    };

    /**
     * Populate the modal with the users the list is currently shared with
     */
    io.socket.get('/getListUsers', {
      list: self.listId
    }, function (users) {
      if (users.err) {
        self.error(users.summary);
      } else {
        self.error(null);
        self.listUsers(users.map(function (user) {
          return new SharedUser(user);
        }));
      }
    });
  }

  // initialize child components
  ko.components.register('share-alert', AlertBox);

  return {
    viewModel: ListUsersViewModel,
    template: html
  };
});