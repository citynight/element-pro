<template>
  <el-descriptions v-bind="props">
    <el-descriptions-item
      v-for="(item, key) in props.dataSource"
      :key="key"
      :label="item.label"
      v-bind="item.bind"
    >
      <template v-if="item.soltName">
        <slot :name="item.soltName"></slot>
      </template>
      <template v-else>
        <el-tooltip
          v-if="item.showTooltip"
          :content="item.value"
          :placement="item.placement"
        >
          <span>{{ item.value }}</span>
        </el-tooltip>
        <template v-else>{{ item.value }}</template>
      </template>
    </el-descriptions-item>
    <slot></slot>
  </el-descriptions>
</template>
<script setup lang="ts">
defineOptions({
  name: 'EPDescriptions'
})
import { computed, useAttrs } from 'vue'
import { DataSource, descriptionProps } from './descriptions'

const props = defineProps(descriptionProps)

const attrs = (item: DataSource) => {
  //  把 item 中的内容转为 attrs
  return {
    ...item
  }
}
</script>
