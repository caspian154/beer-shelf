var path = require('path')

module.exports = {
  entry: './public/app.module.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}
