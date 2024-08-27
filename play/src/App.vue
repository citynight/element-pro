<script setup lang="ts">
import { ModleValueType } from '@element-pro/components/date-range-picker'
import { DataSource } from '@element-pro/components/descriptions/src/descriptions'
import { ref } from 'vue'

const selectedDateRange = ref(['2022-01-01', '2022-01-02'])
const handleDateChange = (value: ModleValueType) => {
  console.log('Selected Range:', value)
}

const valueRange = ref([])

const dataSource: DataSource[] = [
  {
    label: 'Username',
    value: 'kooriookami',
    bind: {
      span: 2
    }
  },
  {
    label: 'Telephone',
    value: '18100000000',
    bind: {
      span: 2
    }
  },
  {
    label: 'Place',
    value: 'Suzhou',
    bind: {
      span: 2
    }
  },
  {
    label: 'Remarks',
    value: 'School'
  },
  {
    label: 'Address',
    value: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province'
  }
]
</script>
<template>
  <!-- {{ selectedDateRange }}
  <EPDateRangePicker
    v-model="selectedDateRange"
    value-format="x"
    @change="handleDateChange"
  ></EPDateRangePicker>

  {{ valueRange }}
  <EPValueRangeInput
    v-model="valueRange"
    range-separator="至"
  ></EPValueRangeInput> -->

  <div>------</div>

  <EPDescriptions title="我是标题" :column="4" :dataSource="dataSource">
    <!-- <ElDescriptionsItem label="Username" :span="3"
      >kooriookami</ElDescriptionsItem
    >
    <ElDescriptionsItem label="Telephone">18100000000</ElDescriptionsItem>
    <ElDescriptionsItem label="Place">Suzhou</ElDescriptionsItem>
    <ElDescriptionsItem label="Remarks">
      <el-tag size="small">School</el-tag>
    </ElDescriptionsItem>
    <ElDescriptionsItem label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
      Province</ElDescriptionsItem
    > -->
  </EPDescriptions>
</template>
<style lang="scss" scoped></style>
