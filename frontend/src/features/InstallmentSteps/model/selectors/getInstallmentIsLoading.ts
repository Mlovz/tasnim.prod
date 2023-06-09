import {StateSchema} from "@/app/providers";


export const getInstallmentIsLoading = (state: StateSchema) => state.installment?.isLoading || false