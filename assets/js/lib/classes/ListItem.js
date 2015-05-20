/*jslint browser: true*/
/*globals define*/

/**
 * ListItem Class
 *
 * id       : The database ID of the item
 * name     : The name of the item
 * quantity : The desired quantity of items
 * checked  : Whether this item has been acquired or not
 */

define(['knockout'], function (ko) {
  'use strict';

  return function ListItem(data) {
    this.id = data.id;
    this.name = ko.observable(data.name);
    this.quantity = ko.observable(data.quantity);
    this.checked = ko.observable(data.checked);
  };
});