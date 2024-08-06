import DefaultTheme from "vitepress/theme";
import EIcon from '@element-pro/components/icon';
import '@element-pro/theme-chalk/src/index.scss';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('e-icon', EIcon) //在 vitepress 中注册全局组件
  }
}
