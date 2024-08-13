import { ExtractPropTypes, PropType } from 'vue'

export type ValueRangeInputType = (string | number)[]
export const valueRangeInputProps = {
  modelValue: {
    type: Array<number> as PropType<ValueRangeInputType>
  },
  endGreaterThanStart: {
    type: Boolean,
    default: true
  },
  rangeSeparator: {
    type: String,
    default: '-'
  }
} as const

export type ValueRangeInputProps = ExtractPropTypes<typeof valueRangeInputProps>

export const valueRangeInputEmits = {
  'update:modelValue': (value: ValueRangeInputType) => value.length === 2,
  change: (value: ValueRangeInputType) => value.length === 2
}

export type ValueRangeInputEmits = typeof valueRangeInputEmits
