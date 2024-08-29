import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@element-pro/theme-chalk/src/index.scss'

import DateRangePicker from '@element-pro/components/date-range-picker'
import ValueRangeInput from '@element-pro/components/value-range-input'
import Descriptions from '@element-pro/components/descriptions'
import CountTo from '@element-pro/components/count-to'
import BasicForm from '@element-pro/components/basic-form'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const plugins = [
  DateRangePicker,
  ValueRangeInput,
  Descriptions,
  CountTo,
  BasicForm
]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
