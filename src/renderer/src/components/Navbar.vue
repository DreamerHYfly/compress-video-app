<template>
  <div class="text-slate-600 border-b bg-gray-50 text-xs flex justify-between px-3 py-2">
    <el-text class="opacity-80 mx-1">视频压缩</el-text>
    <section class="flex justify-between gap-3">
      <RouterLink active-class="active" to="/home">
        <el-button type="info" round size="small">转码</el-button>
      </RouterLink>
      <RouterLink active-class="active" to="/peizhi">
        <el-button type="info" round size="small">配置</el-button>
      </RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
