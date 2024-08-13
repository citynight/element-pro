# 快捷日期范围组件

用于快速选择日期范围

## 使用

<script setup lang="ts">
import { ModleValueType } from '@element-pro/components/date-range-picker'
import { ref } from 'vue'

const selectedDateRange = ref(['2022-01-01', '2022-01-02'])
const handleDateChange = (value: ModleValueType) => {
  console.log('Selected Range:', value)
}
</script>
<template>
  <EPDateRangePicker
    v-model="selectedDateRange"
    value-format="x"
    @change="handleDateChange"
  ></EPDateRangePicker>
</template>
