import { readFile, writeFile } from 'fs/promises'

// get json file
const releaseJson = JSON.parse(await readFile('release.json', { encoding: 'utf-8' }))

// update release
releaseJson.name = process.env.VERSION
releaseJson.notes = `Read our changelog to learn more: https://drgnjs.com/changelog/${process.env.VERSION.replaceAll('.', '')}`
releaseJson.pub_date = process.env.PUBLISHED_AT.replaceAll('\"', '')

// update signatures
const macSignature = await (await fetch(`https://github.com/drgnjs/drgn/releases/download/${process.env.VERSION}/drgn.app.tar.gz.sig`)).text()
releaseJson.platforms.darwin.signature = macSignature

const linuxSignature = await (await fetch(`https://github.com/drgnjs/drgn/releases/download/${process.env.VERSION}/drgn_${process.env.VERSION.replace('v', '')}_amd64.AppImage.tar.gz.sig`)).text()
releaseJson.platforms.linux.signature = linuxSignature

const windowsSignature = await (await fetch(`https://github.com/drgnjs/drgn/releases/download/${process.env.VERSION}/drgn_${process.env.VERSION.replace('v', '')}_x64_en-US.msi.zip.sig`)).text()
releaseJson.platforms.win64.signature = windowsSignature

// update download urls
releaseJson.platforms.darwin.url = `https://github.com/drgnjs/drgn/releases/download/${process.env.VERSION}/drgn.app.tar.gz`
releaseJson.platforms.linux.url = `https://github.com/drgnjs/drgn/releases/download/${process.env.VERSION}/drgn_${process.env.VERSION.replace('v', '')}_amd64.AppImage.tar.gz`
releaseJson.platforms.win64.url = `https://github.com/drgnjs/drgn/releases/download/${process.env.VERSION}/drgn_${process.env.VERSION.replace('v', '')}_x64_en-US.msi.zip`

// update json file
await writeFile('release.json', JSON.stringify(releaseJson, null, 2) + '\n')
