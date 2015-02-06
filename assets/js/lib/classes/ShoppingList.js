/*jslint browser: true*/
/*globals define*/

define(['knockout'], function (ko) {
  'use strict';

  return function ShoppingList(data) {
    this.id = data.id;
    this.name = ko.observable(data.name);
    this.viewLink = '/list/show/' + data.id;
  };
});