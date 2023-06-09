import {StateSchema} from "@/app/providers";


export const getSuccessTitle = (state: StateSchema) => state.success.title || ''