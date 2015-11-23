/*jslint browser: true*/

require([
  'jquery',
  'parallax',
  'lib/global'
], function ($) {
  'use strict';

  $('.parallax').imageScroll({
    coverRatio: 0.9
  });
});
