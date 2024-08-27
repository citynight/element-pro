import { ExtractPropTypes, PropType } from 'vue'
import { descriptionProps as elDescriptionProps } from 'element-plus'

export const dataSourceBind = {
  span: {
    type: Number,
    default: 1
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  minWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  className: {
    type: String
  },
  labelClassName: {
    type: String
  }
}

export type DataSourceBind = Partial<ExtractPropTypes<typeof dataSourceBind>>
export const dataSource = {
  label: {
    type: String
  },
  bind: {
    type: [Object] as PropType<DataSourceBind>
  },
  // 自定义内容
  /* 如果有自定义则走自定义 */
  soltName: {
    type: String
  },
  // 显示tooltip
  showTooltip: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<'top' | 'left' | 'right' | 'bottom'>,
    default: 'top'
  },
  value: {
    type: String
  }
} as const
export type DataSource = Partial<ExtractPropTypes<typeof dataSource>> //<

export const descriptionProps = {
  ...elDescriptionProps,
  // 这里要有一个 list 里面放的是 ElDescriptionItem 组件
  dataSource: {
    type: Array as PropType<DataSource[]>,
    default: () => []
  }
}
export type DescriptionsProps = typeof descriptionProps
