import {StateSchema} from "@/app/providers";


export const getIsSuccess = (state: StateSchema) => state.success.isSuccess || false