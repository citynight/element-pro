import { createApp } from 'vue'
import App from './App.vue'
import '@element-pro/theme-chalk/src/index.scss'
import DateRangePicker from '@element-pro/components/date-range-picker'
console.log(DateRangePicker)

const plugins = [DateRangePicker]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))
app.mount('#app')
