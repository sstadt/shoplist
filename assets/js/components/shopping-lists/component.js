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
          console.log(response.error);
        }
      });
    };

    // /**
    //  * Toggle a link's edit state
    //  * @param  {Link} link The link to make editable
    //  * @return {void}
    //  */
    // self.toggleEdit = function (link) {
    //   var linkIndex = _.findIndex(self.links(), function (l) {
    //     return link.id === l.id;
    //   });

    //   link.edit = !link.edit;
    //   self.links.replace(self.links()[linkIndex], new Link(link));
    // };

    // /**
    //  * Update a link
    //  * @param  {Link} link The link to update
    //  * @return {void}
    //  */
    // self.updateLink = function (link) {
    //   var updatedLink = {
    //     id: link.id,
    //     name: link.tempName,
    //     caption: link.tempCaption,
    //     link: link.tempLink
    //   };

    //   io.socket.post('/link/update', updatedLink, function (response) {
    //     if (response.success) {
    //       var linkIndex = _.findIndex(self.links(), function (l) {
    //         return link.id === l.id;
    //       });

    //       console.log(response);

    //       self.links.replace(self.links()[linkIndex], new Link(response.link));
    //     } else {
    //       alert('error');
    //       console.log(response);
    //     }
    //   });
    // };

    // /**
    //  * Remove a link from the list
    //  * @param  {Link} link The Link object to remove from the list
    //  * @return {void}
    //  */
    // self.removeLink = function (link) {
    //   if (confirm("Are you sure you want to remove this link?")) {
    //     io.socket.post('/link/destroy', { id: link.id }, function (response) {
    //       if (response.success) {
    //         self.links.destroy(link);
    //       } else {
    //         alert('error');
    //         console.log(response);
    //       }
    //     });
    //   }
    // };

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
        console.log(response.error);
      }
    });

  } /* End of View Model */

  return {
    viewModel: LinkListViewModel,
    template: html
  };
});

