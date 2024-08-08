<template>
  <div :class="bem.b()">
    <el-button
      :size="size"
      type="primary"
      :plain="selectedRange !== 'today'"
      @click="handleRangeChange('today')"
      >Today</el-button
    >
    <el-button
      :size="size"
      type="primary"
      :plain="selectedRange !== 'yesterday'"
      @click="handleRangeChange('yesterday')"
      >Yesterday</el-button
    >
    <el-button
      :size="size"
      type="primary"
      :plain="selectedRange !== 'last7Days'"
      @click="handleRangeChange('last7Days')"
      >Last 7 Days</el-button
    >
    <el-button
      :size="size"
      type="primary"
      :plain="selectedRange !== 'last30Days'"
      @click="handleRangeChange('last30Days')"
      >Last 30 Days</el-button
    >
    <el-date-picker
      :size="size"
      style="margin-left: 12px"
      v-model="pickedDate"
      type="daterange"
      :clearable="false"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      @change="handleDateChange"
    ></el-date-picker>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import {
  dateRangePickerEmits,
  dateRangePickerProps,
  DateRangePickerType
} from './date-range-picker'
import { createNamespace } from '@element-pro/utils/create'

defineOptions({
  name: 'EDateRangePicker'
})

const bem = createNamespace('date-range-picker')

const props = defineProps(dateRangePickerProps)
const emit = defineEmits(dateRangePickerEmits)

const pickedDate = ref<string[]>([])
const selectedRange = ref<DateRangePickerType>('today')

const handleDateChange = (value: string[]) => {
  selectedRange.value = 'custom'
  console.log('Selected Range:', value)
  updateModel(value.map(item => dayjs(item)))
}

const handleRangeChange = (value: DateRangePickerType) => {
  const getStartAndEnd = (startDays: number, endDays: number) => {
    const start = dayjs().subtract(startDays, 'day').startOf('day')
    // .format('YYYY-MM-DD HH:mm:ss')
    const end = dayjs().subtract(endDays, 'day').endOf('day')
    // .format('YYYY-MM-DD HH:mm:ss')
    return [start, end]
  }

  switch (value) {
    case 'today':
      updateModel(getStartAndEnd(0, 0))
      break
    case 'yesterday':
      updateModel(getStartAndEnd(1, 1))
      break
    case 'last7Days':
      updateModel(getStartAndEnd(6, 0))
      break
    case 'last30Days':
      updateModel(getStartAndEnd(29, 0))
      break

    default:
      break
  }

  selectedRange.value = value
  pickedDate.value = []
}

const updateModel = (value: dayjs.Dayjs[]) => {
  let list: typeof props.modelValue = []
  const format = props.valueFormat
  if (format) {
    if (format == 'x') {
      list = value.map(item => item.unix())
    } else {
      list = value.map(item => item.format(props.valueFormat))
    }
  } else {
    list = value.map(item => item.valueOf())
  }
  emit('update:modelValue', list)
  emit('change', list)
}

const setDefaultRange = () => {
  selectedRange.value = 'today'
  const start = dayjs().startOf('day')
  const end = dayjs().endOf('day')
  updateModel([start, end])
}

onMounted(() => {
  setDefaultRange()
})
</script>
