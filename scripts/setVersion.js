import { readFile, writeFile } from 'fs/promises'

const tauriJson = JSON.parse(await readFile('src-tauri/tauri.conf.json', { encoding: 'utf-8' }))

tauriJson.package.version = process.env.VERSION.replace('v', '')

await writeFile('src-tauri/tauri.conf.json', JSON.stringify(tauriJson))
