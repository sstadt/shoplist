/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function (grunt) {

  grunt.config.set('watch', {
    options: {
      livereload: 9090,
    },
    api: {
      files: ['api/**/*']
    },
    views: {
      files: ['views/**/*']
    },
    assets: {
      files: ['assets/js/**/*', 'assets/images/**/*', 'tasks/pipeline.js'],
      tasks: ['copy:dev']
    },
    sass: {
      files: ['assets/styles/**/*'],
      tasks: ['sass:dev']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
