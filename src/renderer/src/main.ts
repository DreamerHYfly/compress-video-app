// import './assets/main.css'
import './assets/tailwind.css'
import '@renderer/assets/global.scss'

import { createApp } from 'vue'
// pinia 应该在elementplus前创建
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

const pinia = createPinia()
// import vue-router from ''

createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
