export {default as Step1} from './ui/Step1/Step1'
export {default as Step2} from './ui/Step2/Step2'
export {default as Step3} from './ui/Step3/Step3'
export {default as Step4} from './ui/Step4/Step4'
export {default as Step5} from './ui/Step5/Step5'

export type {StepProps} from './model/types/steps'


export {installmentActions, installmentReducer} from './model/slice/installmentSlice'
export type {InstallmentSchema} from './model/types/steps'
export  {getStepsFormData} from './model/selectors/getStepsFormData'
export  {getInstallmentIsSuccess, getInstallmentIsSuccessContent, getInstallmentIsSuccessTitle} from './model/selectors/getInstallmentIsSuccess'
export  {getInstallmentIsLoading} from './model/selectors/getInstallmentIsLoading'
