const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

// configure Babel Loader
const configureBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  }
}

// configure Pug Loader
const configurePugLoader = () => {
  return {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: {
      pretty: true,
      self: true,
      root: path.resolve(__dirname, '../src'),
    },
  }
}

const PAGES_DIR = path.join(__dirname, '../src/pages')

const getPagesEntrees = (source, type) => (
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory() && !/^_/.test(dir.name))
    .map(dir => fs.readdirSync(`${source}/${dir.name}/`)
        .filter(file => file.endsWith(`.${type}`)))
    .flat()
)

const PAGES = getPagesEntrees(PAGES_DIR, 'pug')

const entryHtmlPlugins = PAGES.map(page => {
  let pageName = page.replace(/\.pug/, '');

  return new HtmlWebPackPlugin({
    filename: `${pageName}.html`,

    // template for individual pages index, about and contact
    template: `./src/pages/${pageName}/${pageName}.pug`,

    // json data drawn into pug templates
    DATA: require(`../src/pages/${pageName}/${pageName}.json`),

    // injecting js and css files into
    // html as well as common share.js file
    chunks: [pageName, 'share'],
  })
})

// configure Output
const configureOutput = () => {
  return {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vendor/js/[name].[fullhash].js',
    // assetModuleFilename: 'images/static/[name].[hash][ext]',
    publicPath: './',
  }
}

const getEntry = () => {
  const entrees = getPagesEntrees(PAGES_DIR, 'js')

  let obj = {}

  for (const key in entrees) {
    if (Object.hasOwnProperty.call(entrees, key)) {
      const el = entrees[key];
      const elName = el.replace(/\.js/, '')

      obj[elName] = { import: `./src/pages/${elName}/${el}`, dependOn: 'share' }
    }
  }

  return obj
}

const ENTREES = getEntry()

module.exports = {
  // input files
  entry: {
    ...ENTREES,
    share: './src/js/module/share.js'
  },
  // not working
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '@s': path.resolve(__dirname, '../src/style'),
    },
  },
  // configuration of output files
  output: configureOutput(),
  module: {
    rules: [

      // Images, fonts, e.t.c: Copy files to build folder
      // https://webpack.js.org/guides/asset-modules/#resource-assets
      {
        test: /\.svg/,
        type: 'asset/resource',
        generator: {
          // adding a hash to the file
          filename: 'assets/images/static/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },

      configureBabelLoader(),
      configurePugLoader()
    ],
  },
  plugins: [
    ...entryHtmlPlugins,
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
      inlineAll: true,
      svgoConfig: [
        {
          removeDimensions: true
        }
      ]
    }),
  ]
};
