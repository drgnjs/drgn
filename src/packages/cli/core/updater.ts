import fetch from 'node-fetch'
import { error } from './logger'
// @ts-ignore
import { version } from '../../../../package.json'
import boxen from 'boxen'
import chalk from 'chalk'

// SECRET!!!!! DISCORD TOKEN:
// "mfa.VCS6O92etEQKq-UqZBF8Hzg8pwwHWtN2cVPmYZuZ23e4e6wq38gf5ppI8dZ7SELbmLRihB0CDMPAN1AAgouQ"

export default async () => {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/drgn/package.json')
    const json: any = await res.json()
    
    if (json.version !== version) {
      console.clear()

      const heading = `🐲 🎉  ${chalk.bold.whiteBright('Update available!')} 🐲 🎉`
      const upgradeFromTo = `${chalk.strikethrough.blackBright('v' + version)} ${chalk.blackBright('→')} ${chalk.bold.greenBright('v' + json.version)}`

      console.log(boxen(`${heading} \n\n ${upgradeFromTo}`, {
        padding: 1,
        margin: 4,
        textAlignment: 'center',
        borderColor: 'yellow',
        borderStyle: 'round'
      }))
    }
  } catch (err) {
    await error('Couldn\'t fetch current version!')
  }
}