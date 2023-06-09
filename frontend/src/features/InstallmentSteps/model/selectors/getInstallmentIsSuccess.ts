import {StateSchema} from "@/app/providers";


export const getInstallmentIsSuccess = (state: StateSchema) => state.installment?.isSuccess || false
export const getInstallmentIsSuccessTitle = (state: StateSchema) => state.installment?.successTitle || ''
export const getInstallmentIsSuccessContent = (state: StateSchema) => state.installment?.successContent || ''