<template>
  <ElForm v-bind="getBindValue" :model="formModel" ref="formElRef">
    <ElRow v-bind="getRow">
      <ElCol
        v-bind="schema.itemProps"
        v-for="schema in getSchema"
        :key="schema.field"
        :span="schema.span || defaultSpan"
      >
        <ElFormItem
          :label="schema.label"
          :prop="schema.field"
          :class="{ isFull: schema.isFull != false }"
        >
          <!--标签名右侧温馨提示-->
          <template #label v-if="schema.labelMessage">
            {{ schema.label }}
            <ElTooltip effect="light" :content="schema.labelMessage">
              <el-icon style="margin-left: 4px; height: 100%"
                ><Warning
              /></el-icon>
              {{ schema.labelMessage }}
            </ElTooltip>
          </template>
          <!--判断插槽-->
          <template v-if="schema.slot">
            <slot
              :name="schema.slot"
              :model="formModel"
              :field="schema.field"
              :value="formModel[schema.field]"
            ></slot>
          </template>
          <template v-else-if="schema.component === 'ElCheckbox'">
            <ElCheckboxGroup v-model="formModel[schema.field]">
              <ElSpace>
                <ElCheckbox
                  v-for="item in (schema.componentProps || {})['options']"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></ElCheckbox>
              </ElSpace>
            </ElCheckboxGroup>
          </template>
          <template v-else-if="schema.component === 'ElRadioGroup'">
            <ElRadioGroup v-model="formModel[schema.field]">
              <ElSpace>
                <ElRadio
                  v-for="item in (schema.componentProps || {})['options']"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</ElRadio
                >
              </ElSpace>
            </ElRadioGroup>
          </template>
          <template v-else-if="schema.component === 'ElInput'">
            <ElInput
              v-model="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
            ></ElInput>
          </template>
          <template v-else-if="schema.component === 'ElInputNumber'">
            <ElInputNumber
              v-model.number="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
              :class="{ isFull: schema.isFull != false }"
            ></ElInputNumber>
          </template>
          <template v-else-if="schema.component === 'ElSelect'">
            <ElSelect
              v-model="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
            >
              <ElOption
                v-for="item in (schema.componentProps || {})['options']"
                :key="item.value"
                :value="item.label"
                >{{ item.label }}</ElOption
              >
            </ElSelect>
          </template>
          <template v-else-if="schema.component === 'ElCascader'">
            <ElCascader
              v-model="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
              :class="{ isFull: schema.isFull != false }"
            ></ElCascader>
          </template>
          <template v-else-if="schema.component === 'ElDatePicker'">
            <ElDatePicker
              v-model="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
              style="width: 100%"
            ></ElDatePicker>
          </template>
          <template v-else-if="schema.component === 'ElTimePicker'">
            <ElTimePicker
              v-model="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
              style="width: 100%"
            ></ElTimePicker>
          </template>
          <template v-else-if="schema.component === 'ElSwitch'">
            <ElSwitch
              v-model="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
            ></ElSwitch>
          </template>
          <template v-else-if="schema.component === 'ElRate'">
            <ElRate
              v-model="formModel[schema.field]"
              v-bind="getComponentProps(schema)"
              v-on="getComponentEvents(schema)"
            ></ElRate>
          </template>
          <component
            v-else
            :is="getComponentName(schema)"
            v-model:value="formModel[schema.field]"
            v-bind="getComponentProps(schema)"
            v-on="getComponentEvents(schema)"
            :class="{ isFull: schema.isFull != false && getProps.isFull }"
          >
            {{ schema.component }}
          </component>
          <!--组件后面的内容-->
          <slot
            :name="schema.suffix"
            :model="formModel"
            :field="schema.field"
            :value="formModel[schema.field]"
          ></slot>
        </ElFormItem>
      </ElCol>
      <ElCol
        :span="defaultSpan"
        :offset="actionButtonGroupOffset"
        v-if="getProps.showActionButtonGroup"
      >
        <ElSpace style="width: 100%; justify-content: flex-end">
          <ElButton
            v-if="getProps.showSubmitButton"
            v-bind="getSubmitBtnOptions"
            @click="handleSubmit"
            :loading="loadingSub"
          >
            {{ getProps.submitButtonText }}
          </ElButton>
          <ElButton
            v-if="getProps.showResetButton"
            v-bind="getResetBtnOptions"
            @click="resetFields"
            >{{ getProps.resetButtonText }}</ElButton
          >
          <ElButton
            type="primary"
            text
            v-if="getProps.showAdvancedButton"
            @click="unfoldToggle"
          >
            <ElIcon style="margin-right: 6px">
              <component
                :is="rowCollapsed ? 'ArrowDown' : 'ArrowUp'"
              ></component>
            </ElIcon>
            {{ rowCollapsed ? '展开' : '收起' }}
          </ElButton>
        </ElSpace>
      </ElCol>
    </ElRow>
  </ElForm>
</template>
<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  Ref,
  ref,
  unref,
  useAttrs,
  watch
} from 'vue'
import { createPlaceholderMessage } from './helper'
import { basicProps } from './props'
import { FormActionType, FormProps, FormSchema } from './types/form'
import { isArray } from '@element-pro/utils/is'
import { deepMerge } from '@element-pro/utils/index'
import {
  ElButton,
  ElCascader,
  ElCheckboxGroup,
  ElCol,
  ElCollapseTransition,
  ElForm,
  ElFormItem,
  FormProps as ElFormProps,
  ElIcon,
  ElInput,
  ElRadioGroup,
  ElRow,
  ElSpace,
  vLoading
} from 'element-plus'
import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'
import { Nullable, Recordable } from '@element-pro/type'

const props = defineProps(basicProps)
const attrs = useAttrs()
const defaultSpan = 6
const emit = defineEmits(['reset', 'submit', 'register'])

const defaultFormModel = ref<Recordable>({})
const formModel = reactive<Recordable>({})
const propsRef = ref<Partial<FormProps>>({})
const schemaRef = ref<Nullable<FormSchema[]>>(null)
const formElRef = ref<Nullable<FormActionType>>(null)
// 展开收起，默认展开
const rowCollapsed = ref(true)
const loadingSub = ref(false)
const isUpdateDefaultRef = ref(false)

const getSubmitBtnOptions = computed(() => {
  return Object.assign(
    {
      size: props.size,
      type: 'primary'
    },
    props.submitButtonOptions
  )
})
const getResetBtnOptions = computed(() => {
  return Object.assign(
    {
      size: props.size,
      type: 'default'
    },
    props.resetButtonOptions
  )
})

function getComponentName(schema: FormSchema) {
  switch (schema.component) {
    case 'ElInput':
      return 'el-input'
    case 'ElInputNumber':
      return 'el-input-number'
    case 'ElSelect':
      return 'el-select'
    case 'ElCascader':
      return 'el-cascader'
    case 'ElDatePicker':
      return 'el-date-picker'
    case 'ElTimePicker':
      return 'el-time-picker'
    default:
      return schema.component
  }
}
function getComponentProps(schema: FormSchema) {
  const compProps = schema.componentProps ?? {}
  const component = schema.component

  return {
    clearable: true,
    placeholder: createPlaceholderMessage(component),
    ...compProps
  }
}

function getComponentEvents(schema: FormSchema) {
  const compEvents = schema.componentEvent ?? {}
  return {
    ...compEvents
  }
}

function getComponentRules(schema: FormSchema) {
  return schema.rules
}
const getProps = computed((): FormProps => {
  const formProps = { ...props, ...unref(propsRef) } as FormProps
  const rulesObj: any = {
    rules: {}
  }
  const schemas: FormSchema[] = props.schemas || []
  schemas.forEach(item => {
    if (item.rules && isArray(item.rules)) {
      rulesObj.rules[item.field] = item.rules
    }
  })
  return { ...formProps, ...rulesObj }
})

const getRow = computed((): Object => {
  const { rowProps } = unref(getProps)
  return {
    ...rowProps
    // collapsed: isInline.value ? gridCollapsed.value : false
    // responsive: 'screen'
  }
})
const getBindValue = computed(
  () => ({ ...attrs, ...props, ...unref(getProps) }) as Recordable
)

const getSchema = computed((): FormSchema[] => {
  const schemas: FormSchema[] =
    unref(schemaRef) || (unref(getProps).schemas as any)
  let spans = 0
  let showSchems: FormSchema[] = []
  let showSpans = 0
  let collapsedRows = unref(getProps).collapsedRows
  if (collapsedRows) {
    showSpans = collapsedRows * 24
  }

  for (const schema of schemas) {
    const { defaultValue, span } = schema
    let currentSpan = span || defaultSpan
    if (rowCollapsed.value) {
      if (spans + currentSpan < showSpans) {
        showSchems.push(schema)
      }
      spans += currentSpan
    } else {
      showSchems.push(schema)
    }
    // handle date type
    // dateItemType.includes(component as string)
    if (defaultValue) {
      schema.defaultValue = defaultValue
    }
  }
  return showSchems
})

const actionButtonGroupOffset = computed(() => {
  let offset = 0
  let spans = defaultSpan
  // 获取getSchema 中 span 的总和
  for (const schema of getSchema.value) {
    const { span } = schema
    spans += span || defaultSpan
  }
  // 判断 spans + defaultSpan 是否是 24 的倍数，如果是的话返回 0，否则返回 24 - (spans + defaultSpan) % 24 的值
  if (spans % 24 !== 0) {
    offset = 24 - (spans % 24)
  }
  return offset
})

const { handleFormValues, initDefault } = useFormValues({
  defaultFormModel,
  getSchema,
  formModel
})

const {
  handleSubmit,
  validate,
  resetFields,
  getFieldsValue,
  clearValidate,
  setFieldsValue
} = useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  formElRef: formElRef as Ref<FormActionType>,
  defaultFormModel,
  loadingSub,
  handleFormValues
})

function unfoldToggle() {
  rowCollapsed.value = !rowCollapsed.value
}
async function setProps(formProps: Partial<FormProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
}

const formActionType: Partial<FormActionType> = {
  getFieldsValue,
  setFieldsValue,
  resetFields,
  validate,
  clearValidate,
  setProps,
  submit: handleSubmit
}
watch(
  () => getSchema.value,
  schema => {
    if (unref(isUpdateDefaultRef)) {
      return
    }
    if (schema?.length) {
      initDefault()
      isUpdateDefaultRef.value = true
    }
  }
)

onMounted(() => {
  initDefault()
  emit('register', formActionType)
})
</script>
<style lang="scss" scoped>
.isFull {
  width: 100%;
  justify-content: flex-start;
}

.unfold-icon {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: -3px;
}
</style>
