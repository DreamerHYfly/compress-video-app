<template>
  <div class="h-10 rounded-lg bg-orange-300 absolute top-0 left-0 dywidth"></div>
  <div class="h-10 inline-block absolute top-3 left-1 w-full">
    <span
      v-show="rtProgress > 0"
      class="inline-block bg-slate-50 rounded-full ml-2 w-6 h-6 items-center relative text-center -top-1 lh"
    >
      <el-text>{{ rtProgress }}</el-text>
    </span>
    <span class="inline-block w-10/12 ml-2">
      <el-text class="line-clamp-1">
        {{ filePath.split('\\')[filePath.split('\\').length - 1] }}
      </el-text>
    </span>
  </div>

  <div class="icon absolute top-3 right-2" @click="deletevideo(index)">
    <delete-one theme="outline" size="16" fill="#333" />
  </div>
</template>

<script setup lang="ts" name="Videoitem">
import { DeleteOne } from '@icon-park/vue-next'
import { computed } from 'vue'
import { useResolutionStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
const props = defineProps(['filePath', 'rtProgress', 'index'])
const csswidth = computed(() => props.rtProgress + '%')
const store = useResolutionStore()
const { videospath } = storeToRefs(store)
function deletevideo(index) {
  const videopath = videospath.value[index]
  clearInterval(videopath.videoprogressid)

  window.fs.readFile(videopath.outputlog, (err, data) => {
    if (err) return
    if (data) window.fs.unlinkSync(videopath.outputlog)
  })
  window.fs.readFile(videopath.outputlog, (err, data) => {
    if (err) return
    if (data) window.fs.unlinkSync(videopath.outputPath)
  })
  window.fs.readFile(videopath.outputlog, (err, data) => {
    if (err) return
    if (data) window.fs.unlinkSync(videopath.outputPath.split('.')[0])
  })
  videospath.value.splice(index, 1)
}
</script>

<style scoped lang="scss">
.icon {
  @apply text-slate-300 opacity-50 hover:text-yellow-500 hover:opacity-90 cursor-pointer hover:scale-125;
}
.lh {
  line-height: 1.5rem;
}
.dywidth {
  width: v-bind(csswidth);
}
</style>
