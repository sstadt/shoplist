/*jslint browser: true*/
/*globals define*/

define(function () {
  'use strict';

  return function ShoppingList(data) {
    this.id = data.id;
    this.name = data.name;
    this.viewLink = '/list/show/' + data.id;
  };
});