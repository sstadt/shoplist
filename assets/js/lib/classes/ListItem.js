/*jslint browser: true*/
/*globals define*/

define(function () {
  'use strict';

  return function ListItem(data) {
    this.id = data.id;
    this.name = data.name;
    this.quantity = data.quantity;
    this.checked = data.checked;
  };
});