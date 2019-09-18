const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: `css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/`
      },
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080/`,
    hot: true,
    compress: true,
    stats: `errors-only`
  },
};
