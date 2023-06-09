import {StateSchema} from "@/app/providers";


export const getProfileChangePasswordFetchMessageSuccess = (state: StateSchema) =>
    state.profile.profileChangePasswordFetchMessage.successTitle || ''