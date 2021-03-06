const path = require('path');
const slsw = require('serverless-webpack');
const isLocal = slsw.lib.webpack.isLocal;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  mode: isLocal ? 'development' : 'production',
  devtool: isLocal ? 'source-map' : 'none',
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    extensions: ['.mjs', '.ts', '.js']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          // Without this, sls will crash if "individually:true"
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new DashboardPlugin()
  ]
};
