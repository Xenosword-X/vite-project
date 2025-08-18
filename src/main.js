import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import { i18n, bootstrapI18n } from './i18n'
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
app.use(i18n)
// 先載入當前語系，再掛載
bootstrapI18n()
  .then(() => {
    app.mount('#app')
  })
  .catch((err) => {
    console.error('[i18n bootstrap failed]', err)
    // 失敗也讓 app 掛起來，避免整個白屏
    app.mount('#app')
  })
