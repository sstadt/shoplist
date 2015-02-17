/*jslint browser: true*/
/*globals define*/

define(['knockout'], function (ko) {
  return function SharedUser(data) {
    this.id = data.id;
    this.email = data.email;
    this.loading = ko.observable(false);
  };
});