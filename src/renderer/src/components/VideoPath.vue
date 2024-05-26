<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>视频保存路径</span>
        </div>
      </template>
      <div class="flex justify-between gap-3">
        <el-input v-model="folderpath" placeholder="D:\Desktop\file" />
        <el-button type="primary" @click="selectfolder">选择</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useResolutionStore } from '@renderer/store'
import { storeToRefs } from 'pinia'

const store = useResolutionStore()
const { folderpath } = storeToRefs(store)

function selectfolder() {
  window.electron.ipcRenderer.send('open-Directory')
  window.electron.ipcRenderer.on('Directory-opened', (event, filePath) => {
    if (event && filePath)
      folderpath.value = window.path.join((filePath ? filePath : 'D:\\Desktop') + 'file')
  })
}
</script>

<style scoped></style>
