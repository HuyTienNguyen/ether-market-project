const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // your webpack configuration options
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  plugins: [
    new Dotenv({
        path: './.env' // default is .env
    })
  ]
};