module.exports = {
  entry: __dirname + '/index.jsx',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel?stage=0"}
    ]
  }
}
