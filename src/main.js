import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/styles.css'
import '@/assets/js/scripts'
import store from '@/store/index'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'

const cookies = useCookies()
const getToken = cookies.cookies.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${getToken}`

createApp(App).
use(cookies).
use(store).
use(router).mount('#app')
