<template>
  <div class="slider-demo-block">
    <span class="demonstration">码率</span>
    <el-slider v-model="value1" />
  </div>
</template>

<script setup lang="ts">
import { useResolutionStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
const store = useResolutionStore()
const { value1 } = storeToRefs(store)
</script>

<style scoped>
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 2px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 85%;
}
</style>
