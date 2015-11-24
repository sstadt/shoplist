/*jslint browser: true*/

require([
  'jquery',
  'modernizr',
  'parallax',
  'lib/global'
], function ($) {
  'use strict';

  $('.parallax').imageScroll({
    coverRatio: 0.9,
    touch: Modernizr.touch
  });
});
