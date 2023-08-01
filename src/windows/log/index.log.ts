import { BrowserWindow } from 'electron'

declare const LOG_WINDOW_WEBPACK_ENTRY: string
declare const LOG_WINDOW_PRELOAD_WEBPACK_ENTRY: string

export const createLogWindow = () => {
  const logWindow = new BrowserWindow({
    width: 1000,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    title: 'Log | ArgentX Wallets Generator',
    transparent: false,
    closable: false,
    webPreferences: {
      preload: LOG_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  logWindow.loadURL(LOG_WINDOW_WEBPACK_ENTRY)

  return logWindow
}

