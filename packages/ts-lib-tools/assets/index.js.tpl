'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./{packageName}.cjs.production.js');
} else {
  module.exports = require('./{packageName}.cjs.development.js');
}

exports.default = module.exports;
