const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin'); // stylelint插件

// 测试stylelint
// module.exports = {
//   mode: 'development',
//   entry: './src/js/index',
//   output: {
//     path: path.resolve(__dirname, 'dest'),
//     filename: 'bundle.js'
//   },
//   plugins: [
//     new StyleLintPlugin({
//       files: ['**/*.css', '**/*.less', '**/*.scss', '**/*.html', '**/*.htm', '**/*.vue']
//     })
//   ]
// };

module.exports = function (env, argv) {
  env = env || { };
  let conf = null;
  if (env.production) { // 生产环境
    conf = require('./conf/webpack.production');
  } else if (env.development) { // 开发环境
    conf = require('./conf/webpack.development');
  } else { // 测试环境
    conf = require('./conf/webpack.test');
  }
  
  return {
    entry: './src/js/index',
    module: {
      rules: [
        // 处理JavaScript
        {
          test: /\.(js|jsx)$/i,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                exclude: /node_modules|bower_modules/
              }
            }
          ]
        },
        // 处理css
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [ require('autoprefixer') ]
              }
            }],
        },
        // 处理less
        {
          test: /\.less$/i,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        // 处理fonts
        {
          test: /\.(eot|svg|woff|woff2|ttf)/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                outputPath: 'fonts/',
                limit: 4*1024
              }
            }
          ]
        },
        // 处理图片(1)
        {
          test: /\.(jpg|png|bmp|gif)$/i, // 以jpg、png、bmp、gif结尾的文件
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'imgs/', // 相对于output.path的相对路径
                publicPath: env.production ? './build/imgs/' : './imgs/' // 输出到css的路径
              }
            }
          ]
        },
        // 处理图片(2)
        {
          test: /\.(jpg|png|bmp|gif)$/i, // 以jpg、png、bmp、gif结尾的文件
          use: [
            {
              loader: 'url-loader',
              options: {
                outputPath: 'imgs/', // 相对于output.path的相对路径
                publicPath: env.production ? './build/imgs/' : './imgs/', // 输出到css的路径
                limit: 4*1024 // 大于4K使用file-loader生成文件，小于4K使用base64直接存储在css，减少请求次数
              }
            }
          ]
        }
      ]
    },
    ...conf
  };
};