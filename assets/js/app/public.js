/*jslint browser: true*/

require([
  'knockout',
  'components/shopping-lists/component',
], function (ko, ShoppingLists) {
  'use strict';

  //ko.components.register('shopping-lists', ShoppingLists);

  // apply character list view model to the dom
  ko.applyBindings();
});