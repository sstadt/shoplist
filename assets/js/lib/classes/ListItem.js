/*jslint browser: true*/
/*globals define*/

define(['knockout'], function (ko) {
  'use strict';

  return function ListItem(data) {
    this.id = data.id;
    this.name = ko.observable(data.name);
    this.quantity = ko.observable(data.quantity);
    this.checked = ko.observable(data.checked);

    this.nameColumnClass = ko.computed(function () {
      return this.checked() ? 'small-8 medium-10 columns item-name' : 'small-10 medium-11 columns item-name terminate';
    }, this);
  };
});