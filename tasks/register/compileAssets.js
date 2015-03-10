module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'sass:dev',
    'copy:dev',
  ]);
};
