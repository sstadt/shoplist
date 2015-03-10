module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:dev',
    'compileAssets',
    'sails-linker:devStyles',
    'clean:build',
    'copy:build'
  ]);
};
