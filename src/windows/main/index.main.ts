import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import * as path from 'path'
import * as fs from 'fs'
import { EVENTS } from '../../shared/constants'
import { DeployOpts, GenerateOpts } from '../../shared/types'
import { generator } from '../../performers/generator'
import { loadWalletsSync, saveWalletsSync } from '../../shared/utils'
import { createLogWindow } from '../log/index.log'
import { deployer } from '../../performers/deploy'
import dayjs from 'dayjs'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 580,
    width: 350,
    resizable: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    title: 'ArgentX Wallets Generator [DEGENSOFT]',
    transparent: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegrationInWorker: true,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // mainWindow.webContents.openDevTools()

  ipcMain.handle(EVENTS.dialog.openTxtFile, async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({ filters: [ { name: 'Text Files', extensions: [ 'txt' ] }, ] })
    if (!canceled) {
      const p = path.parse(filePaths[0])
      return { name: p.name + p.ext, path: filePaths[0], lines: fs.readFileSync(filePaths[0]).toString().split('\n').length }
    }
  })

  ipcMain.handle(EVENTS.dialog.openCsvFile, async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({ filters: [ { name: 'CSV files', extensions: [ 'csv' ] }, ] })
    if (!canceled) {
      const p = path.parse(filePaths[0])
      return { name: p.name + p.ext, path: filePaths[0] }
    }
  })

  ipcMain.handle(EVENTS.performers.generate, async (event, opts: GenerateOpts) => {
    const mnemonics = opts.mnemonicsFile
      ? fs.readFileSync(opts.mnemonicsFile).toString().split('\n').map(line => line.trim()).filter(line => line.length > 0)
      : undefined

    const wallets = await generator({ mnemonics, quantity: opts.quantity })

    const saveDialog = await dialog.showSaveDialog({
      defaultPath: 'argentx-wallets.csv',
      filters: [
        { name: 'CSV Files', extensions: [ 'csv' ] },
        { name: 'All Files', extensions: [ '*' ] }
      ]
    })

    if (!saveDialog.canceled) {
      saveWalletsSync(wallets, { path: saveDialog.filePath, delimiter: opts.settings.delimiter })
    }
  })

  ipcMain.handle(EVENTS.performers.deploy, async (event, opts: DeployOpts) => {
    const logWindow = createLogWindow()

    mainWindow.on('closed', () => {
      if(logWindow.isDestroyed() === false) {
        logWindow.setClosable(true)
      }
    })

    const log = (m: string) => {
      if (logWindow.isDestroyed() === false) {
        logWindow.webContents.send(EVENTS.log, `[${dayjs().format('DD.MM.YYYY hh:mm.ss.SSS')}] ${m}`)
      }
    }

    const wallets = loadWalletsSync({ path: opts.walletsFile, delimiter: opts.settings.delimiter })
    if (opts.settings.mixWallets) {
      wallets.sort(() => Math.random() - 0.5)
    }

    await new Promise<void>(resolve => {
      logWindow.webContents.once('did-finish-load', () => {
        deployer(wallets, opts.settings, log).then(() => resolve())
      })
    })

    log('Done')
    logWindow.setClosable(true)
  })
}


app.on('ready', createWindow)
app.setName('ArgentX Wallets Generator [DEGENSOFT]')

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.setAboutPanelOptions({
  applicationName: 'ArgentX Wallets Generator [DEGENSOFT]',
  credits: 'Created by DEGENSOFT.IO',
  version: 'v1.0.0',
})
