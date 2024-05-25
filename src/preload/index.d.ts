import { ElectronAPI } from '@electron-toolkit/preload'
import * as path from 'path'
import * as childProcess from 'child_process'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import ffmpegsourse from 'fluent-ffmpeg'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      get__dirname: () => string
      //ffmepgInit: () => void
    }
    childProcess: childProcess
    path: path
    __basename: string
    ffmpeg: ffmpeg
    ffmpegsourse: ffmpegsourse
    fs: fs
  }
}
