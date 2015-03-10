module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'clean:dev',
    'compileAssetsProd',
    'sails-linker:prodStyles',
    'clean:build',
    'copy:build'
  ]);
};
