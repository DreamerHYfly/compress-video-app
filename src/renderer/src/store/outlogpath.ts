import { defineStore } from 'pinia'

export const useGetLogPathStore = defineStore('getLogPath', {
  actions: {
    outlogpath(folderpath, videopath) {
      const logname = window.path.parse(videopath.filePath).name + '.log'
      return window.path.join(folderpath.value, logname)
    }
  }
})
