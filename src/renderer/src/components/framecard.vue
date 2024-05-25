<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>帧数</span>
        </div>
      </template>
      <el-select v-model="frame" placeholder="Select" class="w-100 mb-4">
        <el-option v-for="(item, index) in frames" :key="index" :label="item" :value="item" />
      </el-select>
      <div class="flex justify-between gap-3">
        <el-input v-model="input" placeholder="输入帧数，如35" />
        <el-button type="success" @click="addResolution">增加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useResolutionStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
const store = useResolutionStore()
const { frames, frame } = storeToRefs(store)

const input = ref()

function addResolution() {
  frames.value.push(input.value)
  frame.value = input.value
}
</script>

<style scoped></style>
