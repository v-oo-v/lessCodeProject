import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router/index'
import 'element-plus//theme-chalk/index.css'
import ElementPlus from 'element-plus'

createApp(App)
.use(Router)
.use(ElementPlus)
.mount('#app')
