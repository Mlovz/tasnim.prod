import {StateSchema} from "@/app/providers";


export const getAuthSuccessData = (state:StateSchema) => state.auth?.success || null