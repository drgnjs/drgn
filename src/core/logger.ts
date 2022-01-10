import chalk from 'chalk'
import log from 'log-update'

export class Task {
  private interval

  constructor(message: string) {
    console.clear()
    
    const frames = ['', '.', '..', '...']
    let i = 0

    this.interval = setInterval(() => {
      const frame = frames[i++ % frames.length]
      log(`${chalk.bold.yellowBright('drgn »')} ${chalk.blackBright(message + frame)}`)
    }, 200)
  }

  end = async () => {
    clearInterval(this.interval)
    log.clear()
  }
}

export const notice = async (message: string) => {
  console.log(chalk.bold.yellowBright('drgn » ') + chalk.blackBright(message))
}

, success = async (message: string) => {
  console.log(chalk.bold.yellowBright('drgn » ') + chalk.greenBright(message))
}

, error = async (message: string) => {
  console.log(chalk.bold.yellowBright('drgn » ') + chalk.redBright(message))
}