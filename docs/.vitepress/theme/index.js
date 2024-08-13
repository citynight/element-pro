import DefaultTheme from 'vitepress/theme'
import DateRangePicker from '@element-pro/components/date-range-picker'
import '@element-pro/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('EPDateRangePicker', DateRangePicker) //在 vitepress 中注册全局组件
  }
}
