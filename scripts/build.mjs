import { build } from 'esbuild'
import stylePlugin from 'esbuild-style-plugin'

(async () => {
  await build({
    entryPoints: ['src/index.tsx'],
    minify: true,
    bundle: true,
    watch: true,
    loader: {
      '.ts': 'tsx'
    },
    legalComments: 'none',
    outfile: 'dist/index.js',
    plugins: [stylePlugin()]
  })
})()
