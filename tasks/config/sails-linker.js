/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 *    https://github.com/Zolmeister/grunt-sails-linker
 *
 */

var cacheBust = new Date().getTime();

module.exports = function(grunt) {

  grunt.config.set('sails-linker', {

    devStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': ['.tmp/public/styles/style.css'],
        'views/**/*.html': ['.tmp/public/styles/style.css'],
        'views/**/*.ejs': ['.tmp/public/styles/style.css']
      }
    },

    prodStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s?v=' + cacheBust + '">',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/styles/style.css'],
        'views/**/*.html': ['.tmp/public/styles/style.css'],
        'views/**/*.ejs': ['.tmp/public/styles/style.css']
      }
    },
  });

  grunt.loadNpmTasks('grunt-sails-linker');
};
