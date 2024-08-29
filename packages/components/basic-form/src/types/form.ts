import { ElRow, ButtonProps, FormProps as ElFormProps } from 'element-plus'
import { ComponentType } from '.'
import { Recordable } from '@element-pro/type'
import { CSSProperties } from 'vue'
export type ElRowProps = Parameters<
  Exclude<(typeof ElRow)['setup'], undefined>
>[0]

export interface FormSchema {
  label: string
  field: string
  span?: number
  defaultValue?: any
  component?: ComponentType
  componentProps?: object
  componentEvent?: object
  rules?: any
  rowProps?: ElRowProps
  labelMessage?: string
  labelMessageStyle?: object | string
  [key: string]: any
}

export interface FormProps {
  model?: Recordable
  labelWidth?: number | string
  schemas?: FormSchema[]
  inline: boolean
  size: string
  labelPlacement: string
  isFull: boolean
  showActionButtonGroup?: boolean
  showResetButton?: boolean
  resetButtonOptions?: Partial<ButtonProps>
  showSubmitButton?: boolean
  showAdvancedButton?: boolean
  submitButtonOptions?: Partial<ButtonProps>
  submitButtonText?: string
  resetButtonText?: string
  rowProps?: ElFormProps
  itemProps?: ElRowProps
  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  submitOnReset?: boolean
  baseGridStyle?: CSSProperties
  collapsedRows?: number
}

export interface FormActionType {
  submit: () => Promise<any>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  setSchema: (schemaProps: Partial<FormSchema[]>) => Promise<void>
  setFieldsValue: (values: Recordable) => void
  clearValidate: (name?: string | string[]) => Promise<void>
  getFieldsValue: () => Recordable
  resetFields: () => Promise<void>
  validate: (nameList?: any[]) => Promise<any>
  setLoading: (status: boolean) => void
}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]
