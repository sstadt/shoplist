/**
 * Compiles RequireJS Packages
 *
 * ---------------------------------------------------------------
 */
module.exports = function (grunt) {

  grunt.config.set('requirejs', {
    compile: {
      options: {
        appDir: "assets/js",
        baseUrl: "./",
        dir: ".tmp/public/js-build",
        mainConfigFile: 'assets/js/lib/config.js',
        findNestedDependencies: true,
        removeCombined: true,
        skipDirOptimize: true,
        modules: [
          {
            name: 'app/index'
          },
          {
            name: 'app/list'
          },
          {
            name: 'app/public'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
};