import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import * as path from 'path'
import * as childProcess from 'child_process'
import * as fs from 'fs'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffprobePath from '@ffprobe-installer/ffprobe'

import * as ffmpeg from 'fluent-ffmpeg'
import ffmpegsourse from 'fluent-ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath.path.replace('app.asar', 'app.asar.unpacked'))
ffmpeg.setFfprobePath(ffprobePath.path.replace('app.asar', 'app.asar.unpacked'))

ffmpegsourse.setFfmpegPath(ffmpegPath.path.replace('app.asar', 'app.asar.unpacked'))
ffmpegsourse.setFfprobePath(ffprobePath.path.replace('app.asar', 'app.asar.unpacked'))

// import * as os from 'os'
// import * as fs from 'fs'
// ;(function () {
//   const platform = os.platform()
//   const arch = os.arch()
//   const basePath = path.resolve(
//     __dirname.replace('app.asar', 'app.asar.unpacked'),
//     'bin',
//     platform,
//     // arm64 is limit supported only for macOS
//     platform === 'darwin' && arch === 'arm64' ? 'arm64' : 'x64'
//   )
//   const name = 'ffmpeg'
//   const binPath = path.resolve(basePath, platform === 'win32' ? `${name}.exe` : name)
//   ffmpeg.setFfmpegPath(binPath)
// })()
// const ffmpegCommandArr = []
const __basename = __dirname
// Custom APIs for renderer
const api = {
  get__dirname: () => ipcRenderer.invoke('__dirnameVariable')
  // ffmepgInit: () => ipcRenderer.invoke('ffmepgInit')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('childProcess', childProcess)
    contextBridge.exposeInMainWorld('path', path)
    contextBridge.exposeInMainWorld('__basename', __basename)
    contextBridge.exposeInMainWorld('ffmpeg', ffmpeg)
    contextBridge.exposeInMainWorld('ffmpegsourse', ffmpegsourse)
    contextBridge.exposeInMainWorld('fs', fs)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.childProcess = childProcess
  // @ts-ignore (define in dts)
  window.path = path
  // @ts-ignore (define in dts)
  window.__basename = __basename
  // @ts-ignore (define in dts)
  window.ffmpeg = ffmpeg
  // @ts-ignore (define in dts)
  window.ffmpegsourse = ffmpegsourse
  // @ts-ignore (define in dts)
  window.fs = fs
}
