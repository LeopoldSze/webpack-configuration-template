const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { STYLELINT } = require('./index');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.min.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/template.html')
    }),
    ...STYLELINT ? [new StyleLintPlugin({
      files: ['**/*.css', '**/*.less', '**/*.scss', '**/*.html', '**/*.htm', '**/*.vue']
    })] : []
  ]
};