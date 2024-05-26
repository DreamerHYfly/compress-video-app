import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { videopathinterface } from '@renderer/store/interfaces'
// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useResolutionStore = defineStore('resolution', () => {
  const sizes = ref(['1024*720', '1920*1080'])
  const size = ref('1920*1080')
  const frames = ref([60, 30])
  const frame = ref(60)
  const value1 = ref(45)
  const folderpath = ref('D:\\Desktop\\compressedfile')

  const videospath = reactive<videopathinterface[]>([])

  return { value1, sizes, size, frames, frame, folderpath, videospath }
})
