import { contextBridge, ipcRenderer } from 'electron'
import { EVENTS } from '../../shared/constants'


const api = {
  onLogEvent: (callback: Parameters<typeof ipcRenderer.on>[1]) => ipcRenderer.on(EVENTS.log, callback)
}

contextBridge.exposeInMainWorld('logBridge', api)


declare global {
  interface Window {
    logBridge: typeof api
  }
}
