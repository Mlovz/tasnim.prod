import {StateSchema} from "@/app/providers";


export const getAuthError = (state: StateSchema) => state.auth?.error || ''