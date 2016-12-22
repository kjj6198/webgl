var path = require('path');
module.exports={
  context: __dirname,
  entry: {
    distortion: "./src/js/distortion.js",
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
