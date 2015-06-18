/*jslint browser: true*/
/*globals define*/

define([
  'knockout',
  'jquery',
  'foundation',
  'foundation.alert',
  'foundation.abide',
  'foundation.reveal',
  'foundation.topbar',
  'foundation.tooltip'
], function (ko, $) {

  // greetings!
  var greeting = 'If you\'re seeing this, you\'re taking a look at my code!\n' +
                 'You can see the entire codebase for this application, as well as my other repos on github: https://github.com/sstadt';

  console.log(greeting);

  ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
      // Initially set the element to be instantly visible/hidden depending on the value
      var value = valueAccessor();
      $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function (element, valueAccessor) {
      // Whenever the value subsequently changes, slowly fade the element in or out
      var value = valueAccessor();
      if (ko.unwrap(value)) {
        $(element).fadeIn();
      } else {
        $(element).fadeOut();
      }
    }
  };

  $(document).foundation();
});