import { app, BrowserWindow } from 'electron'
import { join } from 'path'
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) app.quit()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    center: true,
    frame: false,
    title: 'drgn',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.removeMenu()
  mainWindow.setIcon(join(__dirname, '../../src/assets/icon.png'))

  // mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})