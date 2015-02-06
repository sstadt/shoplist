/*jslint browser: true*/
/*globals define*/

define([
  'text!./template.html'
], function (html) {
  'use strict';

  function OverlayLoaderViewModel(params) {

    this.loading = params.loading;

  } /* End of View Model */

  return {
    viewModel: OverlayLoaderViewModel,
    template: html
  };
});

