export const sleep = (time) => {
  const timeStamp = new Date().getTime()
  const endTime = timeStamp + time
  /* eslint-disable no-constant-condition */
  while (1) {
    if (new Date().getTime() > endTime) {
      return
    }
  }
}
