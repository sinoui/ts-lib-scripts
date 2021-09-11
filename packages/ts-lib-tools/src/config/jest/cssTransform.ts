import { VERSION } from 'rollup';

console.log('jest version', VERSION);

const cssTranform = {
  process(): string {
    return 'module.exports = {};';
  },
  getCacheKey(): string {
    return 'cssTransform';
  },
};

module.exports = cssTranform;
