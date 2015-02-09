module.exports = {
  entry: './components/main.js',
  output: {
    filename: './site/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
