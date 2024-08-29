import { ComponentType } from './types/index'

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component?: ComponentType) {
  if (!component) return ''
  if (component === 'ElInput') return '请输入'
  if (
    [
      'ElPicker',
      'ElSelect',
      'ElCheckbox',
      'ElRadio',
      'ElSwitch',
      'ElDatePicker',
      'ElTimePicker'
    ].includes(component)
  )
    return '请选择'
  return ''
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker']

function genType() {
  return [...DATE_TYPE, 'RangePicker']
}

/**
 * 时间字段
 */
export const dateItemType = genType()

export function defaultType(component) {
  if (component === 'NInput') return ''
  if (component === 'NInputNumber') return null
  return [
    'NPicker',
    'NSelect',
    'NCheckbox',
    'NRadio',
    'NSwitch',
    'NDatePicker',
    'NTimePicker'
  ].includes(component)
    ? ''
    : undefined
}
