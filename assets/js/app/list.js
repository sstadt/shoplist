/*jslint browser: true*/

require([
  'knockout',
  'components/list-items/component',
], function (ko, ListItems) {
  'use strict';

  ko.components.register('list-items', ListItems);

  // apply character list view model to the dom
  ko.applyBindings();
});