import { readFile } from 'fs/promises'
import { existsSync } from 'fs'

const getConfiguration = async (directory: string) => {
  if (!existsSync(directory + '/drgn.json'))
    return null

  const config: any = Object.entries(JSON.parse(await readFile(directory + '/drgn.json', 'utf-8')))

  let finalConfig: any = {}

  for (const [key, value] of config) {
    if (typeof value === 'object')
      for (const [deepKey, deepValue] of value)
        finalConfig[key][deepKey] = deepValue
    else
      finalConfig[key] = value
  }

  return finalConfig
}

export default getConfiguration

/*
const getSecrets = async (directory: string) => {
  const secrets = JSON.parse(await readFile(directory + '/drgn.env.json', 'utf-8'))
  return secrets
}

const getConfiguration = async (directory: string) => {
  if (!existsSync(directory + '/drgn.json')) await error('Couldn\'t find any configuration!')

  const config: any = Object.entries(JSON.parse(await readFile(directory + '/drgn.json', 'utf-8')))

  let finalConfig: any = {}

  for (const [key, value] of config) {
    if (value.startsWith('$$') && value.endsWith('$$')) {
      // get the value from the .env
      finalConfig[key] = (await getSecrets(directory))[key.replaceAll('$$', '')]
    } else if (typeof value === 'object') {
      // if option is an object, go one layer deeper
      for (const [deepKey, deepValue] of value) {
        if (deepValue.startsWith('$$') && deepValue.endsWith('$$')) {
          finalConfig[key][deepKey] = (await getSecrets(directory))[deepValue.replaceAll('$$', '')]
        } else {
          finalConfig[key][deepKey] = deepValue
        }
      }
    } else {
      // just set the key and value
      finalConfig[key] = value
    }
  }

  return finalConfig
}

export default getConfiguration
*/