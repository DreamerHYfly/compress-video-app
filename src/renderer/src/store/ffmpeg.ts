import { defineStore, storeToRefs } from 'pinia'

import { useResolutionStore } from '@renderer/store/index'
const store = useResolutionStore()
const { size, frame, value1, folderpath } = storeToRefs(store)

import { useGetLogPathStore } from '@renderer/store/outlogpath'
const getLogPathStore = useGetLogPathStore()

export const useFFmpegStore = defineStore('ff', {
  actions: {
    getVideoDuration(filePath) {
      return new Promise<number>((resolve, reject) => {
        window.ffmpeg.ffprobe(filePath, (error, metadata) => {
          if (error) {
            reject(error)
          } else {
            const duration: number = metadata.format.duration
            resolve(duration)
          }
        })
      })
    },

    transcode(
      sourcepath: string,
      resolution: string,
      fps: number,
      bitrate: number,
      logpath: string,
      outpath: string
    ) {
      // const tran = new window.ffmpegsourse()
      // window.electron.ipcRenderer.send('startcode', sourcepath, resolution, fps, bitrate, outpath)
      // window.electron.ipcRenderer.on('seeprogress', (event, pregress) => {
      //   console.log(pregress)
      // })
      // window
      //   .ffmpegsourse(sourcepath)
      //   .outputOptions(['-s', resolution, '-r', fps, '-b:v', bitrate])
      //   .on('progress', (progress) => {
      //     console.log(progress)
      //     console.log(progress.percent)
      //   })
      //   .output(outpath)
      const func = async () => await window.api.get__dirname()
      // const ffmpeg = window.path.join(
      //   window.path.dirname(window.path.dirname(window.__basename)),
      //   'resources/ffmpeg'
      // )
      func().then((res) => {
        const ffmpeg = window.path
          .join(window.path.dirname(window.path.dirname(res)), 'resources/ffmpeg')
          .replace('app.asar', 'app.asar.unpacked')

        window.childProcess.exec(
          `${ffmpeg} -i ${sourcepath} -s ${resolution} -r ${fps} -b:v ${bitrate} -stats_period 0.1 -progress ${logpath} ${outpath}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`执行的错误: ${error}`)
            }
            if (stdout) {
              console.log(`stdout: ${stdout}`)
            }
            if (stderr) console.error(`stderr: ${stderr}`)
          }
        )
      })
    },
    starttransecode(videopath) {
      // console.log(videospath.value)

      // console.log(videopath)

      const bitrate = 80000 + 11200 * value1.value
      videopath.outputPath = window.path.join(
        folderpath.value,
        window.path.parse(videopath.filePath).base
      )

      window.fs.readFile(videopath.outputPath, (err, data) => {
        if (err) {
          throw err
          return
        }
        if (data) window.fs.unlinkSync(videopath.outputPath)
      })

      videopath.outputlog = getLogPathStore.outlogpath(folderpath, videopath)

      this.transcode(
        videopath.filePath,
        size.value,
        frame.value,
        bitrate,
        videopath.outputlog,
        videopath.outputPath
      )

      // window.electron.ipcRenderer.send(
      //   'startcode',
      //   videopath.filePath,
      //   size.value,
      //   frame.value,
      //   bitrate,
      //   outpath
      // )

      // window.electron.ipcRenderer.on('seeprogress', (event, pregress) => {
      //   console.log(pregress)
      // })

      // this.transcode(videopath.filePath, size.value, frame.value, bitrate, outlogpath, outpath)
    },
    filechangepregress(videopath) {
      const outlogpath = getLogPathStore.outlogpath(folderpath, videopath)
      let currentprpgress = ''
      videopath.count = 0
      videopath.videoprogressid = setInterval(() => {
        window.fs.readFile(outlogpath, 'utf-8', (err, data) => {
          if (videopath.count > 100) {
            videopath.progress = 0
            clearInterval(videopath.videoprogressid)
            window.fs.unlinkSync(outlogpath)
          }
          if (err) {
            videopath.count++
            console.error('读取文件时发生错误:', err)
            return
          }
          const arr = data.split('\n')
          currentprpgress = arr[arr.length - 2]
          const currenttime = arr[arr.length - 7].match(/[\d]+/)

          const timefloat = parseFloat(currenttime[0]) / 1000000

          videopath.progress = Math.round((timefloat / videopath.duration) * 100)

          if (currentprpgress == 'progress=end') {
            clearInterval(videopath.videoprogressid)
            videopath.progress = 100
            window.fs.unlinkSync(outlogpath)
          }
        })
      }, 200)
    }
  }
})
