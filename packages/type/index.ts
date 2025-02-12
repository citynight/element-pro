import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType
} from 'vue'
type PropType<T> = VuePropType<T>
type VueNode = VNodeChild | JSX.Element

export type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type Nullable<T> = T | null
// type NonNullable<T> = T extends null | undefined ? never : T
export type Recordable<T = any> = Record<string, T>
export type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}
export type Indexable<T = any> = {
  [key: string]: T
}
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
export type TimeoutHandle = ReturnType<typeof setTimeout>
export type IntervalHandle = ReturnType<typeof setInterval>

export interface ChangeEvent extends Event {
  target: HTMLInputElement
}

export interface WheelEvent {
  path?: EventTarget[]
}

export interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

export interface ViteEnv {
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_PUBLIC_PATH: string
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_DROP_CONSOLE: boolean
  VITE_GLOB_PROD_MOCK: boolean
  VITE_GLOB_IMG_URL: string
  VITE_PROXY: [string, string][]
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
}

declare function parseInt(s: string | number, radix?: number): number

declare function parseFloat(string: string | number): number
declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }
  // declare interface Window {
  //   // Global vue app instance
  //   __APP__: App<Element>;
  // }

  // vue

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy

    interface ElementAttributesProperty {
      $props: any
    }

    interface IntrinsicElements {
      [elem: string]: any
    }

    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}
