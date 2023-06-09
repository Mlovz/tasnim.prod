import {StateSchema} from "@/app/providers";


export const getAuthFormData = (state: StateSchema) => state.auth?.authFormData || null