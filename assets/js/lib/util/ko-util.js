/*jslint browser: true*/
/*globals define*/

define(['lodash', 'knockout'], function (_, ko) {
  'use strict';

  return {

    getItemIndex: function (listItem, list) {
      return _.findIndex(list, function (l) {
        return listItem.id === l.id;
      });
    },

    convertToObservable: function (obj) {
      var newObj = {};
      Object.keys(obj).forEach(function (key) {
        newObj[key] = ko.observable(obj[key]);
      });
      return newObj;
    },

  };
});