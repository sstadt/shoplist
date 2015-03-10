module.exports = function (grunt) {
  grunt.registerTask('default', [
    'clean:dev',
    'compileAssets',
    'sails-linker:devStyles',
    'watch'
  ]);
};
