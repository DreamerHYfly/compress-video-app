<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Videoitem from '@renderer/pages/Homepages/Videoitem.vue'
import { useResolutionStore } from '@renderer/store'



const store = useResolutionStore()
const { videospath } = storeToRefs(store)
</script>

<template>
  <div class="overflow-y-auto h-80">
    <section v-for="(video, index) in videospath" v-show="video" :key="index" class="video">
      <Videoitem :file-path="video.filePath" :rt-progress="video.progress" :index="index" />
    </section>
  </div>
</template>

<style scoped>
.video {
  @apply bg-white h-10 mb-2 mx-3 text-xs text-slate-600 rounded-lg relative;
}
.icon {
  @apply text-slate-300 opacity-50 hover:text-yellow-500 hover:opacity-90 cursor-pointer hover:scale-125;
}
</style>
