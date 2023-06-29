// import './assets/main.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.config.globalProperties.window = window
app.config.globalProperties.isMac = window.navigator.userAgentData?.platform?.toLowerCase()?.indexOf('mac') >= 0
app.mount('#app')
