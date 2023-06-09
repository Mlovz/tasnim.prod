import {StateSchema} from "@/app/providers";

export const getUserToken = (state: StateSchema) => state.user.token || ''