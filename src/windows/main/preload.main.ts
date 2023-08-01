import { contextBridge, ipcRenderer } from 'electron'
import { EVENTS } from '../../shared/constants'
import { DeployOpts, GenerateOpts } from '../../shared/types'



const api = {
  openTxtFile: () => ipcRenderer.invoke(EVENTS.dialog.openTxtFile),
  openCsvFile: () => ipcRenderer.invoke(EVENTS.dialog.openCsvFile),
  generate: (opts: GenerateOpts) => ipcRenderer.invoke(EVENTS.performers.generate, opts),
  deploy: (opts: DeployOpts) => ipcRenderer.invoke(EVENTS.performers.deploy, opts),
  openLog: () => ipcRenderer.invoke(EVENTS.openLog),
}

contextBridge.exposeInMainWorld('mainBridge', api)

declare global {
  interface Window {
    mainBridge: typeof api
  }
}
