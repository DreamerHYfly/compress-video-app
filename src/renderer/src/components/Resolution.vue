<script setup lang="ts">
import { ref } from 'vue'
import { useResolutionStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
const store = useResolutionStore()
const { sizes, size } = storeToRefs(store)

const input = ref('')

function addResolution() {
  sizes.value.push(input.value)
  size.value = input.value
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>分辨率</span>
      </div>
    </template>
    <el-select v-model="size" placeholder="Select" class="w-100 mb-4">
      <el-option v-for="(item, index) in sizes" :key="index" :label="item" :value="item" />
    </el-select>
    <div class="flex justify-between gap-3">
      <el-input v-model="input" placeholder="输入分辨率，如790*260" />
      <el-button type="success" @click="addResolution">增加</el-button>
    </div>
  </el-card>
</template>

<style scoped></style>
