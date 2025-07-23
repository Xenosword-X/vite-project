import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
// 如果 localStorage 有 token，就設定到 axios
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common.Authorization = token
}

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(VueAxios, axios)
app.mount('#app')
