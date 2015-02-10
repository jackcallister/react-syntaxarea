module.exports = {
  entry: './src/components/main.js',
  output: {
    filename: './example/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
