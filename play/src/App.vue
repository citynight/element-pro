<script setup lang="ts">
import { ref } from 'vue'

const selectedDateRange = ref(['2022-01-01', '2022-01-02'])
</script>
<template>
  {{ selectedDateRange }}
  <EDateRangePicker
    v-model="selectedDateRange"
    value-format="x"
  ></EDateRangePicker>
</template>
<style lang="scss" scoped></style>
