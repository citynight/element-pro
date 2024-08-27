import { ExtractPropTypes, PropType } from 'vue'

export const countToProps = {
  startVal: { type: Number, default: 0 },
  endVal: { type: Number, default: 2021 },
  duration: { type: Number, default: 1500 },
  autoplay: { type: Boolean, default: true },
  decimals: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0
    }
  },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  separator: { type: String, default: ',' },
  decimal: { type: String, default: '.' },
  /**
   * font color
   */
  color: { type: String },
  /**
   * Turn on digital animation
   */
  useEasing: { type: Boolean, default: true },
  /**
   * Digital animation
   */
  transition: { type: String, default: 'linear' }
} as const

export const countToEmits = {
  onStarted: (): void => {
    return
  },
  onFinished: (): void => {
    return
  }
}

export type CountToProps = ExtractPropTypes<typeof countToProps>
export type CountToEmits = typeof countToEmits
