import { createApp } from 'vue'
import App from './App.vue'
import '@element-pro/theme-chalk/src/index.scss'
import DateRangePicker from '@element-pro/components/date-range-picker'
import ValueRangeInput from '@element-pro/components/value-range-input'
import Descriptions from '@element-pro/components/descriptions'

const plugins = [DateRangePicker, ValueRangeInput, Descriptions]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))
app.mount('#app')
