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

  /**
   * AlertBoxViewModel
   */
  function AlertBoxViewModel(params) {

    var self = this;

    // alert box data
    self.alertBoxType = params.alertType;
    self.alertBoxMessage = params.alertMessage;

    // add foundation classes to the set alert box type
    self.alertBoxClass = ko.computed(function () {
      return 'alert-box radius ' + self.alertBoxType;
    });

    /**
     * Close the alert box
     */
    self.closeAlertBox = function () {
      self.alertBoxMessage(null);
    };

  } /* End of View Model */

  return {
    viewModel: AlertBoxViewModel,
    template: html
  };
});

