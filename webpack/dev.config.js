const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/app.ts'),
  devtool: 'source-map-inline',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'dist/index.js',
    path: path.resolve(__dirname, '../')
  }
};
