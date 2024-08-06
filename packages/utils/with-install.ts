import { Plugin, App } from 'vue'
export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(comp: T) {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    const { name } = comp as unknown as { name: string }
    app.component(name, comp as SFCWithInstall<T>) // 将组件注册到app上
  }
  return comp as SFCWithInstall<T>
}
