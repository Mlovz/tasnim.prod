import {StateSchema} from "@/app/providers";


export const getProfileDataFetchMessageError = (state: StateSchema) => state.profile.profileDataFetchMessage.errorTitle || ''