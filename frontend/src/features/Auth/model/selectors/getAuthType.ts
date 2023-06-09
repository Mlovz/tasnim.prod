import {StateSchema} from "@/app/providers";


export const getAuthType = (state: StateSchema) => state.auth?.type || ''