import { createApp } from 'vue'
import App from './App.vue'
import MyKit from '../packages';
import router from './router'

createApp(App).use(MyKit).use(router).mount('#app')
