import { createApp } from 'vue'
import App from './App.vue'
import '@element-pro/theme-chalk/src/index.scss'

// const plugins = []

const app = createApp(App)

// plugins.forEach(plugin => app.use(plugin))
app.mount('#app')
