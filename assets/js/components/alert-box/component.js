/*jslint browser: true*/
/*globals define*/

/**
 * AlertBox
 *
 * Displays a foundation alert box with a message
 */

define([
  'knockout',
  'text!./template.html'
], function (ko, html) {
  'use strict';

  function AlertBoxViewModel(params) {

    var self = this;

    self.alertBoxType = params.alertType;
    self.alertBoxMessage = params.alertMessage;

    self.alertBoxClass = ko.computed(function () {
      return 'alert-box radius ' + self.alertBoxType;
    });

    self.closeAlertBox = function () {
      self.alertBoxMessage(null);
    };

  } /* End of View Model */

  return {
    viewModel: AlertBoxViewModel,
    template: html
  };
});

