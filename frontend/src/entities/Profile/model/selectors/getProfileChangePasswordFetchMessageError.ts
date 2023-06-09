import {StateSchema} from "@/app/providers";


export const getProfileChangePasswordFetchMessageError = (state: StateSchema) =>
    state.profile.profileChangePasswordFetchMessage.errorTitle || ''