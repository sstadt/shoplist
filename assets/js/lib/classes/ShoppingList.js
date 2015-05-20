/*jslint browser: true*/
/*globals define*/

/**
 * ShippingList Class
 *
 * id       : The database ID of the list
 * name     : The name of the list
 * viewLink : The link to view the shopping list
 */

define(['knockout'], function (ko) {
  'use strict';

  return function ShoppingList(data) {
    this.id = data.id;
    this.name = ko.observable(data.name);
    this.viewLink = '/list/show/' + data.id;
  };
});