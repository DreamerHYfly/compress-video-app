<template>
  <div>
    <section class="flex justify-center gap-3">
      <!-- 打开文件 -->
      <div class="button" @click="addvideofiles">
        <plus theme="outline" size="40" fill="#333" />
      </div>
      <!-- 开始转码 -->
      <div class="button" @click="startchangecode">
        <update-rotation theme="outline" size="40" fill="#333" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Plus, UpdateRotation } from '@icon-park/vue-next'
import { storeToRefs } from 'pinia'
import { useResolutionStore } from '@renderer/store'
const store = useResolutionStore()
const { videospath } = storeToRefs(store)
import { useFFmpegStore } from '@renderer/store/ffmpeg'
const ffmpegstore = useFFmpegStore()
function addvideofiles() {
  window.electron.ipcRenderer.send('open-file')
  window.electron.ipcRenderer.on('file-opened', (event, filePath) => {
    // 处理文件，比如读取内容等
    if (event)
      ffmpegstore.getVideoDuration(filePath).then((duration) => {
        if (
          duration &&
          !videospath.value.some((obj) => {
            return obj.filePath === filePath
          })
        ) {
          window.fs.renameSync(filePath, filePath.replace(/\s+/g, ''))
          filePath = filePath.replace(/\s+/g, '')
          videospath.value.push({
            filePath,
            duration,
            progress: 0,
            videoprogressid: 0,
            outputPath: '',
            outputlog: '',
            count: 0
          })
        }
      })
  })
}

function startchangecode() {
  if (videospath.value.length > 0) {
    for (const videopath of videospath.value) {
      if (videopath.progress < 100) {
        ffmpegstore.starttransecode(videopath)
        ffmpegstore.filechangepregress(videopath)
      }
    }
  }
}

// const { htest } = storeToRefs(ffmpegstore)
</script>

<style scoped>
.button {
  @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600 size-auto;
}
</style>
