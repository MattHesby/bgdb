module.exports = {
  entry: __dirname + '/public/index.jsx',
  output: { path: __dirname, filename: '/public/bundle.js' },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel?stage=0"}
    ]
  }
}
