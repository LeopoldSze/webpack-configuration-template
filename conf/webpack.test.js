const StyleLintPlugin = require('stylelint-webpack-plugin');
const { STYLELINT } = require('./index');

module.exports = {
  mode: 'production',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    ...STYLELINT ? [new StyleLintPlugin({
      files: ['**/*.css', '**/*.less', '**/*.scss', '**/*.html', '**/*.htm', '**/*.vue']
    })] : []
  ]
};