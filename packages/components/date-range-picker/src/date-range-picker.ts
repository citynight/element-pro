import { ExtractPropTypes, PropType } from 'vue'

export type Size = 'large' | 'default' | 'small'
export type DateRangePickerType =
  | 'today'
  | 'yesterday'
  | 'last7Days'
  | 'last30Days'
  | 'custom'

export type ModleValueType = string[] | number[] | Date[]

export const dateRangePickerProps = {
  modelValue: {
    type: Array as PropType<ModleValueType>,
    default: () => []
  },
  valueFormat: {
    type: String
  },
  size: {
    type: String as PropType<Size>,
    default: 'default'
  }
} as const

export const dateRangePickerEmits = {
  'update:modelValue': (value: ModleValueType) => value.length === 2
}

export type DateRangePickerProps = ExtractPropTypes<typeof dateRangePickerProps>
export type DateRangePickerEmits = typeof dateRangePickerEmits
