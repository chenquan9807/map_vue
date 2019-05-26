'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"http://39.108.79.28/SmartPark"'
}
