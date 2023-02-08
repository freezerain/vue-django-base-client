import App from './App.vue'
import './assets/main.css'
import axios from 'axios'
import {createApp} from 'vue';

const app = createApp(App)
app.config.globalProperties.$http = axios;
app.mount('#app')
