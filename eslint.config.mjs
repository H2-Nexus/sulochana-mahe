import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Internal links are plain <a data-route> on purpose: the animation runtime
      // (src/lib/site.js) intercepts them, closes the clouds, then calls
      // router.push. useSite prefetches their routes, which <Link> would otherwise do.
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    // The imperative animation runtime is plain JS written in a terse
    // `cond && fn()` style; keep lint to correctness there.
    files: ['src/lib/site.js'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
