import {StateSchema} from "@/app/providers";


export const getAuthLoading = (state: StateSchema) => state.auth?.isLoading || false