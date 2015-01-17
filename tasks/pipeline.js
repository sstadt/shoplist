/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  // 'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  // 'js/vendor/fastclick/lib/fastclick.js',
  // 'js/vendor/modernizr/modernizr.js',
  // 'js/vendor/jquery/dist/jquery.js',
  // 'js/vendor/jquery-placeholder/jquery.placeholder.js',
  // 'js/vendor/jquery.cookie/jquery.cookie.js',
  // 'js/vendor/foundation/js/foundation/foundation.js',
  // 'js/vendor/foundation/js/foundation/*.js',
  // 'js/vendor/lodash/dist/lodash.js',
  // 'js/vendor/angular/angular.js',
  // 'js/vendor/angular-ui-router/release/angular-ui-router.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  // 'js/app/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function (path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function (path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function (path) {
  return 'assets/' + path;
});
