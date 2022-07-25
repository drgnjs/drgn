import { build } from 'esbuild'
import 'dotenv/config'

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  watch: true,
  platform: 'node',
  format: 'esm',
  external: ['./node_modules/*'],
  outfile: 'dist/index.js',
  define: {
    __encryptionKey: JSON.stringify(process.env.encryptionKey),
    __jwtSecret: JSON.stringify(process.env.jwtSecret),
    __mongo: JSON.stringify(process.env.mongo),
    __port: JSON.stringify(process.env.port),
    __dev: true,
    __rateLimit: JSON.stringify(process.env.rateLimit),
    __emailUser: JSON.stringify(process.env.emailUser),
    __emailPassword: JSON.stringify(process.env.emailPassword)
  }
})
