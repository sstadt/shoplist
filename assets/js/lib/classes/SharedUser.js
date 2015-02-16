/*jslint browser: true*/
/*globals define*/

define(function () {
  return function SharedUser(data) {
    this.id = data.id;
    this.email = data.email;
  };
});