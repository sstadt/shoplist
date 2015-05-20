/*jslint browser: true*/
/*globals define*/

/**
 * OverlayLoader
 *
 * Displays a CSS AJAX loader
 */

define([
  'text!./template.html'
], function (html) {
  'use strict';

  /**
   * OverlayLoaderViewModel
   */
  function OverlayLoaderViewModel(params) {

    this.loading = params.loading;

  } /* End of View Model */

  return {
    viewModel: OverlayLoaderViewModel,
    template: html
  };
});

