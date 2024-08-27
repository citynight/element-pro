import { withInstall } from '@element-pro/utils/with-install'
import _CountTo from './src/count-to.vue'

const CountTo = withInstall(_CountTo)

export default CountTo
declare module 'vue' {
  export interface GlobalComponents {
    EPCountTo: typeof CountTo
  }
}

export type {
  ValueRangeInputEmits,
  ValueRangeInputProps,
  ModleValueType
} from './src/value-range-input.ts'
