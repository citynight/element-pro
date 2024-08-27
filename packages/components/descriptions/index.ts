import { withInstall } from '@element-pro/utils/with-install'
import _Descriptions from './src/descriptions.vue'

const Descriptions = withInstall(_Descriptions)

export default Descriptions
declare module 'vue' {
  export interface GlobalComponents {
    EPDescriptions: typeof Descriptions
  }
}

export type { DescriptionsProps } from './src/descriptions.ts'
