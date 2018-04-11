
###
  A generic webpack for building React components written in coffeescript and CJSX

  jquery, react, react-dom, backbond and underscore are all external (not bundled)

  See also, https://github.com/felixhao28/using-coffee-react-for-frontend-dev-walkthrough
###
fs = require('fs-extra')
_ = require('lodash')

Path = require("path")
Glob = require("glob")
Webpack = require("webpack")
Inflection = require('inflection')
StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


# assume run from project root this the user of this package's package
userPackage = JSON.parse(fs.readFileSync('package.json'))

outputDir = Path.resolve(__dirname, 'dist/')

module.exports = 
  name: userPackage.name
  entry: [
    # "webpack-dev-server/client?http://localhost:3000", # WebpackDevServer host and port
    # "webpack/hot/only-dev-server",
    "./#{userPackage.main}" # Main app"s entry point according to package.json
  ],
  output:{
    path: outputDir
    filename: "#{userPackage.name}.js"
    libraryTarget: "umd"
    library: Inflection.camelize(userPackage.name.replace(/[ \-]/g, "_"), false)
    publicPath: "dist/"
  },
  resolveLoader: {
    modules: [Path.resolve(__dirname, './node_modules')],
  },
  externals: {
    'jquery': {
      root: 'jQuery'
      commonjs2: 'jquery',
      commonjs: 'jquery',
      amd: 'jquery'
    }
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
    'backbone': {
      root: "Backbone"
      commonjs2: 'backbone'
      commonjs: 'backbone'
      amd: 'backbone'
    }
    'underscore': {
      root: "_"
      commonjs2: 'underscore'
      commonjs: 'underscore'
      amd: 'underscore'
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['cache-loader', 'babel-loader'],
      exclude: /node_modules/,
    },{
      test: /\.(coffee|cjsx)$/,
      loaders: [
        'coffee-loader',
        'cjsx-loader',
      ]        
    },{
      test: /\.(csv|txt|tpl)$/,
      loader: 'raw-loader',
    },{
      #inline base64 encoded images, fonts 
      test: /\.(png|jpg|gif|woff|woff2|svg|ttf|eot)$/,
      loader: 'url-loader' 
    }],
  },
    
  plugins: [
    
    # // This plugin produces app/webroot/v7/webpackStats.json
    # // 
    # // You can upload the file here to easily analyze the contents of the bundles: 
    # // https://chrisbateman.github.io/webpack-visualizer/
    # //
    # // Upload here: http://webpack.github.io/analyse/ to see the full dependency graph .
    new StatsWriterPlugin({
      filename: 'webpackStats.json',
      fields: null,
      transform: (data, opts) -> 
        stats = opts.compiler.getStats().toJson({chunkModules: true})
        return JSON.stringify(stats, null, 2)
    }),
    
    # # for faster build
    # new HardSourceWebpackPlugin(),

  ]


