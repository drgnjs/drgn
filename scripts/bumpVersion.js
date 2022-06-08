import { readFile, writeFile } from 'fs/promises'

const tauriJson = JSON.parse(await readFile('src-tauri/tauri.conf.json', { encoding: 'utf-8' }))

tauriJson.package.version = (await readFile('version.txt', { encoding: 'utf-8' })).replace('v', '').replace('\n', '')

await writeFile('src-tauri/tauri.conf.json', JSON.stringify(tauriJson, null, 2) + '\n')
