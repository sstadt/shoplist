/*jslint browser: true*/
/*globals define*/

define([
  'jquery',
  'foundation',
  'foundation.alert',
  'foundation.abide',
  'foundation.reveal',
  'foundation.topbar',
  'foundation.tooltip',
  'bindings/fadeVisible',
  'bindings/statusButton'
], function ($) {

  // greetings!
  var greeting = 'If you\'re seeing this, you\'re taking a look at my code!\n' +
                 'You can see the entire codebase for this application, as well as my other repos, on github: https://github.com/sstadt';
  console.log(greeting);

  $(document).foundation();
});