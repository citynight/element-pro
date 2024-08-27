<template>
  <span :style="{ color }">
    {{ value }}
  </span>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref, watch, watchEffect } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'

import { countToEmits, countToProps } from './count-to'
import { isNumber } from '@element-pro/utils/is'

defineOptions({
  name: 'EPCountTo'
})

const props = defineProps(countToProps)
const emit = defineEmits(countToEmits)

const source = ref(props.startVal)
const disabled = ref(false)
let outputValue = useTransition(source)

const value = computed(() => formatNumber(unref(outputValue)))
watchEffect(() => {
  source.value = props.startVal
})
watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay) {
    start()
  }
})

onMounted(() => {
  props.autoplay && start()
})

function start() {
  run()
  source.value = props.endVal
}
function reset() {
  source.value = props.startVal
  run()
}
function run() {
  outputValue = useTransition(source, {
    disabled,
    duration: props.duration,
    onFinished: () => emit('onFinished'),
    onStarted: () => emit('onStarted'),
    ...(props.useEasing
      ? { transition: TransitionPresets[props.transition] }
      : {})
  })
}
function formatNumber(num: number | string) {
  if (!num) {
    return ''
  }
  const { decimals, decimal, separator, suffix, prefix } = props
  num = Number(num).toFixed(decimals)
  num += ''

  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''

  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}

defineExpose({
  value,
  start,
  reset
})
</script>
