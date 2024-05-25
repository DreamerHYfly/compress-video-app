<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useResolutionStore } from '@renderer/store'

const store = useResolutionStore()
const { folderpath, videospath } = storeToRefs(store)

function stopchangecode() {
  window.childProcess.exec('tasklist | findstr ffmpeg.exe', (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`)
    }
    if (stdout) {
      const ffmpegPid = stdout.match(/\d+/)[0]
      console.log('tasklist拿到,stdout', stdout)

      window.childProcess.exec(`taskkill /F /PID ${ffmpegPid}`, (error, stdout, stderr) => {
        if (error) console.error('关闭进程失败error', error)
        if (stdout) {
          console.log('已经暂停', stdout)
        }
        if (stderr) {
          console.error('关闭进程失败stderr', stderr)
        }
      })
    }
    if (stderr) console.error(`stderr: ${stderr}`)
  })
}
function alldelete() {
  videospath.value.every((item) => {
    clearInterval(item.videoprogressid)
  })
  videospath.value.length = 0

  window.fs.readdir(folderpath.value, (err, files) => {
    if (err) throw err
    for (const file of files) {
      const filePath = window.path.join(folderpath.value, file)
      window.fs.unlink(filePath, (err) => {
        if (err) throw err
        console.log(`${filePath} was deleted!`)
      })
    }
  })
}
function allreset() {
  videospath.value.every((item) => {
    item.progress = 0
  })
  window.fs.readdir(folderpath.value, (err, files) => {
    if (err) throw err
    for (const file of files) {
      const filePath = window.path.join(folderpath.value, file)

      window.fs.unlink(filePath, (err) => {
        if (err) throw err
        console.log(`${filePath} was deleted!`)
      })
    }
  })
}
</script>

<template>
  <div>
    <el-button type="primary" size="small" @click="stopchangecode">停止转码</el-button>
    <el-button type="warning" size="small" @click="alldelete">全部删除</el-button>
    <el-button type="danger" size="small" @click="allreset">全部重置</el-button>
  </div>
</template>

<style scoped></style>
