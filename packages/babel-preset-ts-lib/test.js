/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-var-requires */
const create = require('./create');

module.exports = function(api, opts) {
  return create(api, Object.assign({ helpers: false }, opts), 'test');
};
