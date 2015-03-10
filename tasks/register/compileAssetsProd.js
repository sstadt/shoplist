module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'copy:prod',
    'sass:dev',
    'requirejs',
    'copy:jsbuild',
    'clean:jsbuild',
  ]);
};
