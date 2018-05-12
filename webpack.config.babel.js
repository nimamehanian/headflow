import webpack from 'webpack';
import path from 'path';

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: { main: './src/index' },

  module: {
    rules: [
      {
        test: /\.(js(x)?$)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|styl)$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!stylus-loader',
      },
      {
        test: /\.(gif|jpg|png|svg|eot|otf|ttf|woff(2)?)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000&name=/[name].[ext]',
      },
    ],
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: 'dist',
    compress: true,
    historyApiFallback: true,
    noInfo: true,
    hot: true,
  },

  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};

export default config;
