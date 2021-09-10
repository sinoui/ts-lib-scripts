import { from, mergeMap, mergeWith } from 'rxjs';

import fetchRules from './fetchRules';
import genRuleFile from './utils/gen-rule-file';
import genRuleIndexFile from './utils/gen-rule-index-file';

fetchRules()
  .pipe(
    mergeMap((rules) => {
      const genIndexFile$ = genRuleIndexFile(rules);
      const genRuleFiles$ = from(rules).pipe(mergeMap(genRuleFile, 16));

      return genIndexFile$.pipe(mergeWith(genRuleFiles$));
    }),
  )
  .subscribe({
    complete() {
      console.log('完成');
    },
    error(e) {
      console.error('失败', e);
      process.exit(0);
    },
  });
