import { withInstall } from '@element-pro/utils/with-install'
import _DateRangePicker from './src/date-range-picker.vue'

const DateRangePicker = withInstall(_DateRangePicker)

export default DateRangePicker
declare module 'vue' {
  export interface GlobalComponents {
    EPDateRangePicker: typeof DateRangePicker
  }
}

export type {
  DateRangePickerProps,
  ModleValueType
} from './src/date-range-picker.ts'
