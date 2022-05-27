import { build } from 'esbuild'
import cssModules from 'esbuild-css-modules-plugin'

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
    plugins: [cssModules({
      // optional. set to false to not inject generated css into page;
      // default value is false when set `v2` to `true`, otherwise default is true,
      // if set to `true`, the generated css will be injected into `head`;
      // could be a string of css selector of the element to inject into,
      // e.g.
      // ```
      // inject: '#some-element-id' // the plugin will try to get `shadowRoot` of the found element, and append css to the `shadowRoot`, if no shadowRoot then append to the found element, if no element found then append to document.head
      // ```
      // could be a function with params content & digest (return a string of js code to inject to page),
      // e.g.
      // ```
      // inject: (cssContent, digest) => `console.log("${cssContent}", "${digest}")`
      // ```
      inject: true,

      localsConvention: 'camelCaseOnly', // optional. value could be one of 'camelCaseOnly', 'camelCase', 'dashes', 'dashesOnly', default is 'camelCaseOnly'

      generateScopedName: (name, filename, css) => string, // optional. refer to: https://github.com/madyankin/postcss-modules#generating-scoped-names

      cssModulesOption: {
        // optional, refer to: https://github.com/madyankin/postcss-modules/blob/d7cefc427c43bf35f7ebc55e7bda33b4689baf5a/index.d.ts#L27
        // this option will override others passed to postcss-modules
      },

      v2: true // experimental. v2 can bundle images in css, note if set `v2` to true, other options except `inject` will be ignored. and v2 only works with `bundle: true`.
    })]
  })
})()
