module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'clean:dev',
    'compileAssetsProd',
    'sails-linker:prodStyles',
  ]);
};
