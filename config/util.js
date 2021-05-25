const { resolve } = require('path');
const globImporter = require('node-sass-glob-importer');

module.exports.cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: resolve(__dirname, 'postcss.config.js'),
      },
    },
  },
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      webpackImporter: false,
      sassOptions: {
        importer: globImporter(),
      },
      additionalData: `
        @import "src/styles/main.scss";
      `,
    },
  },
];

// @import "src/style/modules/_config.scss";
// @import "src/style/modules/_global.scss";
