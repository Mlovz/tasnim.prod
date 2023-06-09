import {StateSchema} from "@/app/providers";

export const getSuccessContent = (state: StateSchema) => state.success.content || ''