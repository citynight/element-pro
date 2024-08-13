// RangeInput.vue
<template>
  <div :class="bem.b()">
    <el-input
      v-model="startValue"
      placeholder="开始值"
      type="number"
      @input="handChange"
    />
    <div :class="bem.e('separator')">{{ props.rangeSeparator }}</div>
    <el-input
      v-model="endValue"
      placeholder="结束值"
      type="number"
      @input="handChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { valueRangeInputEmits, valueRangeInputProps } from './value-range-input'
import { createNamespace } from '@element-pro/utils/create'

defineOptions({
  name: 'EPValueRangeInput'
})

const bem = createNamespace('value-range-input')
const startValue = ref('')
const endValue = ref('')

const emits = defineEmits(valueRangeInputEmits)
const props = defineProps(valueRangeInputProps)

if (props.modelValue) {
    startValue.value = props.modelValue[0] || ''
}

// 从 modelValue 中获取开始和结束值，如果没有设置为空

const handChange = () => {
  const values = [startValue.value || '', endValue.value || '']
  emits('update:modelValue', values)
  emits('change', values)
}
</script>
