<script setup lang="ts">
import { ModleValueType } from '@element-pro/components/date-range-picker'
import { ref } from 'vue'

const selectedDateRange = ref(['2022-01-01', '2022-01-02'])
const handleDateChange = (value: ModleValueType) => {
  console.log('Selected Range:', value)
}
</script>
<template>
  {{ selectedDateRange }}
  <EDateRangePicker
    v-model="selectedDateRange"
    value-format="x"
    @change="handleDateChange"
  ></EDateRangePicker>
</template>
<style lang="scss" scoped></style>
