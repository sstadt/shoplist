/*jslint browser: true*/
/*globals requirejs*/

requirejs.config({

  paths: {
    // plugins
    'text'                   : 'vendor/requirejs-text/text',

    // misc
    'sails'                  : 'vendor/sails.io.js/dist/sails.io',
    'jquery'                 : 'vendor/jquery/dist/jquery',
    'lodash'                 : 'vendor/lodash/dist/lodash',
    'knockout'               : 'vendor/knockout/dist/knockout',

    // foundation deps
    'fastclick'              : 'vendor/foundation/js/vendor/fastclick',
    'jquery.cookie'          : 'vendor/foundation/js/vendor/jquery.cookie',
    'modernizr'              : 'vendor/foundation/js/vendor/modernizr',
    'placeholder'            : 'vendor/foundation/js/vendor/placeholder',

    // foundation
    'foundation'             : 'vendor/foundation/js/foundation',
    'foundation.abide'       : 'vendor/foundation/js/foundation/foundation.abide',
    'foundation.accordion'   : 'vendor/foundation/js/foundation/foundation.accordion',
    'foundation.alert'       : 'vendor/foundation/js/foundation/foundation.alert',
    'foundation.clearing'    : 'vendor/foundation/js/foundation/foundation.clearing',
    'foundation.dropdown'    : 'vendor/foundation/js/foundation/foundation.dropdown',
    'foundation.equalizer'   : 'vendor/foundation/js/foundation/foundation.equalizer',
    'foundation.interchange' : 'vendor/foundation/js/foundation/foundation.interchange',
    'foundation.joyride'     : 'vendor/foundation/js/foundation/foundation.joyride',
    'foundation.magellan'    : 'vendor/foundation/js/foundation/foundation.magellan',
    'foundation.offcanvas'   : 'vendor/foundation/js/foundation/foundation.offcanvas',
    'foundation.orbit'       : 'vendor/foundation/js/foundation/foundation.orbit',
    'foundation.reveal'      : 'vendor/foundation/js/foundation/foundation.reveal',
    'foundation.slider'      : 'vendor/foundation/js/foundation/foundation.slider',
    'foundation.tab'         : 'vendor/foundation/js/foundation/foundation.tab',
    'foundation.tooltip'     : 'vendor/foundation/js/foundation/foundation.tooltip',
    'foundation.topbar'      : 'vendor/foundation/js/foundation/foundation.topbar',

    // classes
    'ShoppingList'           : 'lib/classes/ShoppingList',
    'ListItem'               : 'lib/classes/ListItem',

    // utils
    'koutil'                 : 'lib/util/ko-util',
  },

  shim: {
    'placeholder': {
      deps: ['jquery']
    },
    'foundation': {
      deps: ['jquery', 'jquery.cookie', 'modernizr', 'placeholder', 'fastclick']
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'foundation.abide': {
      deps: ['foundation']
    },
    'foundation.accordion': {
      deps: ['foundation']
    },
    'foundation.alert': {
      deps: ['foundation']
    },
    'foundation.clearing': {
      deps: ['foundation']
    },
    'foundation.dropdown': {
      deps: ['foundation']
    },
    'foundation.equalizer': {
      deps: ['foundation']
    },
    'foundation.interchange': {
      deps: ['foundation']
    },
    'foundation.joyride': {
      deps: ['foundation']
    },
    'foundation.magellan': {
      deps: ['foundation']
    },
    'foundation.offcanvas': {
      deps: ['foundation']
    },
    'foundation.orbit': {
      deps: ['foundation']
    },
    'foundation.reveal': {
      deps: ['foundation']
    },
    'foundation.slider': {
      deps: ['foundation']
    },
    'foundation.tab': {
      deps: ['foundation']
    },
    'foundation.tooltip': {
      deps: ['foundation']
    },
    'foundation.topbar': {
      deps: ['foundation']
    }
  },

  deps: [
    'knockout',
    'jquery',
    'sails',
    'foundation',
    'foundation.alert',
    'foundation.abide',
    'foundation.reveal',
    'foundation.topbar',
    'foundation.tooltip',
    'foundation.reveal'
  ],

  callback: function (ko) {

    ko.bindingHandlers.fadeVisible = {
      init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
      },
      update: function (element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
      }
    };

    $(document).foundation();
  }

});







