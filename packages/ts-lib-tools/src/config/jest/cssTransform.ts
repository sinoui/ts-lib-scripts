import { VERSION } from 'rollup';

console.log('jest version', VERSION);

const cssTranform = {
  process(): any {
    return { code: 'module.exports = {};' };
  },
  getCacheKey(): string {
    return 'cssTransform';
  },
};

module.exports = cssTranform;
