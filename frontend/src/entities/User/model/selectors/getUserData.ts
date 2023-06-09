import {StateSchema} from "@/app/providers";

export const getUserData = (state: StateSchema) => state.user.authData || null