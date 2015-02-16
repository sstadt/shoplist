/*jslint browser: true*/

require([
  'knockout',
  'components/list-items/component',
  'components/list-users/component',
], function (ko, ListItems, ListUsers) {
  'use strict';

  ko.components.register('list-items', ListItems);
  ko.components.register('list-users', ListUsers);

  // apply character list view model to the dom
  ko.applyBindings();
});