var path = require('path');
module.exports={
  context: __dirname,
  entry: {
    distortion: "./src/js/index1.js",
    'three-intro': './src/js/three-intro.js',
    'christmas-tree': './src/js/christmas-tree.js',
    'christmas-special': './src/js/christmas-special.js'
  },

  output:{
    filename:"[name]-bundle.js",
    path: path.join(__dirname, 'dist'),
  },
  devtool:"source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(frag|vert)$/,
        loader: 'webpack-glsl'
      }
    ]
  }
}
