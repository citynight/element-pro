import { withInstall } from '@element-pro/utils/with-install'
import _ValueRangeInput from './src/value-range-input.vue'

const ValueRangeInput = withInstall(_ValueRangeInput)

export default ValueRangeInput
declare module 'vue' {
  export interface GlobalComponents {
    EPValueRangeInput: typeof ValueRangeInput
  }
}

export type {
  ValueRangeInputEmits,
  ValueRangeInputProps,
  ModleValueType
} from './src/value-range-input.ts'
