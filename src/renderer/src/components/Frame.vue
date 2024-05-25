<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useResolutionStore } from '@renderer/store'
const store = useResolutionStore()
const { sizes, size, frames, frame } = storeToRefs(store)
import { DeleteOne } from '@icon-park/vue-next'

function deletefarme(index) {
  frames.value.splice(index, 1)
}
</script>

<template>
  <div class="flex justify-around gap-1 p-3">
    <el-select v-model="size" placeholder="Select" style="width: 240px">
      <el-option v-for="(item, index) in sizes" :key="index" :label="item" :value="item" />
    </el-select>
    <el-select v-model="frame" placeholder="Select" style="width: 240px">
      <el-option
        v-for="(item, index) in frames"
        :key="index"
        :label="item"
        :value="item"
        class="flex justify-between items-center"
      >
        <span class="float-left">{{ item }}</span>
        <span class="float-right">
          <div class="icon" @click="deletefarme(index)">
            <delete-one theme="outline" size="13" fill="#333" />
          </div>
        </span>
      </el-option>
    </el-select>
  </div>
</template>

<style scoped>
.icon {
  @apply text-slate-300 opacity-50 hover:text-yellow-500 hover:opacity-90 cursor-pointer hover:scale-125;
}
.icon::after {
  content: ''; /* 在clear类后面添加内容为空 */
  display: block; /* 把添加的内容转化为块元素 */
  clear: both;
}
</style>
