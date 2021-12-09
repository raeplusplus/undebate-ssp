const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'dist'), // dist because app failed when building this as a node_module in another component
  entry: {
    main: './client/main-app.js',
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'assets/webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }                                                                             
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    fallbacks:{
      fs: false // logger wants to require fs though it's not needed on the browser
    }
  },
  plugins: [
    new webpack.IgnorePlugin({resourceRegExp: /nodemailer/}), // not used in the client side - those should be move outside of the app directory
    new webpack.NormalModuleReplacementPlugin(/.+models\/.+/, '/client/client-side-model'), // do not include models on the client side - the app/api files contain server side and client side code
    new webpack.NormalModuleReplacementPlugin(/.+\/the-civil-server\.js$/, '/client/client-side-model'), // on the clientsite map imports of civil-server to an empty module
  ],
}
