<template>
  <div>
    <Frame />
    <Bitrate class="w-10/12 m-auto mb-2" />
    <Action />
    <Button class="flex justify-center p-3 gap-2" />
    <VideoList class="p-3" />
  </div>
</template>

<script setup lang="ts">
import Action from '@renderer/components/Action.vue'
import Frame from '@renderer/components/Frame.vue'
import Bitrate from './Homepages/Bitrate.vue'
import Button from '@renderer/components/Button.vue'
import VideoList from '@renderer/components/VideoList.vue'
</script>

<style scoped></style>
