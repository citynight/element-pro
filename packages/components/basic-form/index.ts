import { withInstall } from '@element-pro/utils/with-install'
import _BasicForm from './src/BasicFrom.vue'

const BasicForm = withInstall(_BasicForm)

export default BasicForm
declare module 'vue' {
  export interface GlobalComponents {
    EPBasicForm: typeof BasicForm
  }
}

export { useForm } from './src/hooks/useForm'
export * from './src/types/form'
export * from './src/types/index'
