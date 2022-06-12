import { readFile, writeFile } from 'fs/promises'

// get latest release
const latestRelease = await (await fetch('https://api.github.com/repos/drgnjs/drgn/releases/latest')).json()

// get json file
const releaseJson = JSON.parse(await readFile('release.json', { encoding: 'utf-8' }))

// update release
releaseJson.name = process.env.VERSION
releaseJson.notes = process.env.CHANGELOG
releaseJson.pub_date = process.env.PUBLISHED_AT.replaceAll('\"', '').replace('T', ' ')

// update signatures
const macSignature = await (await fetch(`https://github.com/drgnjs/drgn/releases/download/${latestRelease.tag_name}/drgn.app.tar.gz.sig`)).text()
releaseJson.platforms.darwin.signature = macSignature

const linuxSignature = await (await fetch(`https://github.com/drgnjs/drgn/releases/download/${latestRelease.tag_name}/drgn_${latestRelease.tag_name.replace('v', '')}_amd64.AppImage.tar.gz.sig`)).text()
releaseJson.platforms.linux.signature = linuxSignature

const windowsSignature = await (await fetch(`https://github.com/drgnjs/drgn/releases/download/${latestRelease.tag_name}/drgn_${latestRelease.tag_name.replace('v', '')}_x64_en-US.msi.zip.sig`)).text()
releaseJson.platforms.win64.signature = windowsSignature

// update download urls
releaseJson.platforms.darwin.url = `https://github.com/drgnjs/drgn/releases/download/${latestRelease.tag_name}/drgn.app.tar.gz`
releaseJson.platforms.linux.url = `https://github.com/drgnjs/drgn/releases/download/${latestRelease.tag_name}/drgn_${latestRelease.tag_name.replace('v', '')}_amd64.AppImage.tar.gz`
releaseJson.platforms.win64.url = `https://github.com/drgnjs/drgn/releases/download/${latestRelease.tag_name}/drgn_${latestRelease.tag_name.replace('v', '')}_x64_en-US.msi.zip`

// update json file
await writeFile('release.json', JSON.stringify(releaseJson, null, 2) + '\n')
