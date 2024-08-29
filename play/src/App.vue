<script setup lang="ts">
import BasicForm, { FormSchema } from '@element-pro/components/basic-form'
import { Recordable } from '@element-pro/type'
import { ElInput } from 'element-plus'
const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'ElInput',
    label: '姓名',
    labelMessage: '这是一个提示',
    componentProps: {
      placeholder: '请输入姓名'
    },
    componentEvent: {
      input: (value: string | number) => {
        console.log('input---', value)
      }
    },
    rules: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    ]
  },
  {
    field: 'mobile',
    component: 'ElInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
      oninput: "value=value.replace(/[^0-9]/g,'')"
    },
    componentEvent: {
      input: (value: string | number) => {
        console.log('input---', value)
      }
    }
  },
  {
    field: 'type',
    component: 'ElSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '舒适性',
          value: 1
        },
        {
          label: '经济性',
          value: 2
        }
      ],
      onUpdateValue: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'makeDate',
    component: 'ElDatePicker',
    label: '预约时间',
    defaultValue: 1183135260000,
    componentProps: {
      type: 'date',
      clearable: true,
      onUpdateValue: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'makeTime',
    component: 'ElTimePicker',
    label: '停留时间',
    componentProps: {
      clearable: true,
      onUpdateValue: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'makeProject',
    component: 'ElCheckbox',
    label: '预约项目',
    componentProps: {
      placeholder: '请选择预约项目',
      options: [
        {
          label: '种牙',
          value: 1
        },
        {
          label: '补牙',
          value: 2
        },
        {
          label: '根管',
          value: 3
        }
      ],
      onUpdateChecked: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'makeSource',
    component: 'ElRadioGroup',
    label: '来源',
    componentProps: {
      options: [
        {
          label: '网上',
          value: 1
        },
        {
          label: '门店',
          value: 2
        }
      ],
      onUpdateChecked: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'status',
    label: '状态',
    //插槽
    slot: 'statusSlot'
  }
]

function handleSubmit(values: Recordable) {
  if (!values) {
    return '请填写完整信息'
  }
  console.log(values)
}

function handleReset(values: Recordable) {
  console.log(values)
}
</script>
<template>
  <BasicForm
    labelWidth="100px"
    :inline="true"
    size="default"
    submitButtonText="搜索"
    layout="horizontal"
    :schemas="schemas"
    :collapsedRows="1"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <template #statusSlot="{ model, field }">
      <ElInput v-model="model[field]" />
    </template>
  </BasicForm>
</template>
<style lang="scss" scoped></style>
