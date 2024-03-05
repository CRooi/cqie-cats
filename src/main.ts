import { createApp } from 'vue'
import './global.css'
import App from './app.vue'
import router from './router'
import TDesign from 'tdesign-mobile-vue'
import 'tdesign-mobile-vue/es/style/index.css'

createApp(App).use(router).use(TDesign).mount('#app')
