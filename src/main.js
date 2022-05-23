import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/styles.css'
import '@/assets/js/scripts'
import store from '@/store/index'
import VueCookies from 'vue3-cookies'

createApp(App).
use(store).
use(VueCookies,{
  expireTimes: "10s",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None"
}).
use(router).mount('#app')
