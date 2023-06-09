import {StateSchema} from "@/app/providers";


export const getProfileDataFetchMessageSuccess = (state: StateSchema) => state.profile.profileDataFetchMessage.successTitle || ''