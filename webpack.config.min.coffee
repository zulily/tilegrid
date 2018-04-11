
###
  optimized config.  see ./webpack.config.coffee
###

fs = require('fs')
Webpack = require("webpack")
Path = require("path")

extend = require('node.extend')

baseConfig = require('./webpack.config')

# assume run from project root this the user of this package's package
userPackage = JSON.parse(fs.readFileSync('package.json'))

optimizedConfig = extend true, {}, baseConfig, 
  name: "#{userPackage.name}.min"
  output:
    filename: "#{userPackage.name}.min.js"


optimizedConfig.plugins = optimizedConfig.plugins.concat([ 
  new Webpack.DefinePlugin({
    # this is what tells React to run in production mode
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new Webpack.optimize.UglifyJsPlugin({
    #makes stack traces on exception unintelligible
    mangle: false,
    mangleProperties: false,
    sourceMap: false
  })  
])

module.exports = optimizedConfig
