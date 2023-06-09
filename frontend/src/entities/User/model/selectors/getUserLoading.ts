import {StateSchema} from "@/app/providers";


export const getUserLoading = (state: StateSchema) => state.user.isLoading || false