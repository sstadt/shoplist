/*jslint browser: true*/
/*globals define*/

/**
 * Knockout Util
 *
 * Miscellaneous common functions that can be performed on observables
 */

define(['lodash', 'knockout'], function (_, ko) {
  'use strict';

  return {

    /**
     * Get an item index from an observable array
     * 
     * @param  {object}  listItem The item to find an index for
     * @param  {array}   list     The array of items to find the item in
     * @return {integer}          The index of the item
     */
    getItemIndex: function (listItem, list) {
      return _.findIndex(list, function (l) {
        return listItem.id === l.id;
      });
    },

    /**
     * Get an item index from an observable array by the object's ID
     * 
     * @param  {string}  listItemId The database ID of the item to find an index for
     * @param  {array}   list       The array of items to find the item in
     * @return {integer}            The index of the item in the array
     */
    getItemIndexById: function (listItemId, list) {
      return _.findIndex(list, function (l) {
        return listItemId === l.id;
      });
    },

    /**
     * Convert an object's properties to observables
     * 
     * @param  {object} obj The object to convert properties for
     * @return {object}     The converted object
     */
    convertToObservable: function (obj) {
      var newObj = {};
      Object.keys(obj).forEach(function (key) {
        newObj[key] = ko.observable(obj[key]);
      });
      return newObj;
    },

  };
});