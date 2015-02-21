/*jslint browser: true*/
/*globals define, io*/

define([
  'knockout',
  'SharedUser',
  'text!./template.html'
], function (ko, SharedUser, html) {

  function ListUsersViewModel(params) {
    var self = this;

    // user data
    self.listId = params.id;
    self.listName = params.name;
    self.searchParam = ko.observable('');
    self.listUsers = ko.observableArray([]);

    // interface data
    self.error = ko.observable(null);
    self.searching = ko.observable(false);
    self.searchResults = ko.observableArray([]);

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

  ko.components.register('share-alert', { require: 'components/alert-box/component' });

  return {
    viewModel: ListUsersViewModel,
    template: html
  };
});