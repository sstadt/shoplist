/**
 * Compiles SASS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/style.sass` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-sass
 */
module.exports = function (grunt) {

  grunt.config.set('sass', {
    options: {
      sourceMap: true
    },
    dev: {
      files: [
        {
          expand: true,
          cwd: 'assets/styles/',
          src: ['style.scss'],
          dest: '.tmp/public/styles/',
          ext: '.css'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-sass');
};
