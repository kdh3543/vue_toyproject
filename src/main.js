import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const cookies = useCookies()
const getToken = cookies.cookies.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${getToken}`

createApp(App).
use(BootstrapVue3).
use(cookies).
use(store).
use(router).mount('#app')
