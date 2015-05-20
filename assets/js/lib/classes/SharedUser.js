/*jslint browser: true*/
/*globals define*/

/**
 * ShareUser Class
 *
 * id      : The database ID of the user
 * email   : The user's email address
 * loading : Whether an AJAX operation on the shared user is pending
 */

define(['knockout'], function (ko) {
  return function SharedUser(data) {
    this.id = data.id;
    this.email = data.email;
    this.loading = ko.observable(false);
  };
});