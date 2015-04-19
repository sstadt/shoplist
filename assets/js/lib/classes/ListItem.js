/*jslint browser: true*/
/*globals define*/

define(['knockout'], function (ko) {
  'use strict';

  return function ListItem(data) {
    this.id = data.id;
    this.name = ko.observable(data.name);
    this.quantity = ko.observable(data.quantity);
    this.checked = ko.observable(data.checked);
  };
});