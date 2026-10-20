import { fmtDate } from './format';

const cases: Array<[string | null | undefined, string]> = [
  ['2026-10-01',                       '1 October 2026'],
  ['2026-09-09T04:20:09.123+00:00',   '9 September 2026'],
  ['2026-09-08T21:30:00+00:00',       '9 September 2026'],  // 21:30 UTC+00 = 00:30 AST next day
  [null,                                ''],
  ['garbage',                          ''],
];

let passed = 0;
let failed = 0;

for (const [input, expected] of cases) {
  const got = fmtDate(input as any);
  if (got === expected) {
    console.log(`PASS  fmtDate(${JSON.stringify(input)}) → ${JSON.stringify(got)}`);
    passed++;
  } else {
    console.error(`FAIL  fmtDate(${JSON.stringify(input)}) → ${JSON.stringify(got)}  (expected ${JSON.stringify(expected)})`);
    failed++;
  }
}

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed > 0 ? 1 : 0);
