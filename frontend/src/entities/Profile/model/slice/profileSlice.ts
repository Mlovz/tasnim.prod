import {ProfileSchema} from "../types/profile";
import {createSlice} from "@reduxjs/toolkit";
import {updateFetchProfileData} from "@/entities/Profile/model/services/updateFetchProfileData";
import {resetPassword} from "@/features/Auth/model/services/authService";


const initialState: ProfileSchema = {
    isProfileChangePasswordLoading: false,
    isProfileDataLoading: false,
    profileDataFetchMessage: {
        successTitle: '',
        errorTitle: ''
    },
    profileChangePasswordFetchMessage:{
        successTitle: '',
        errorTitle: ''
    }
}


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUpdateFetchTitle: (state, action) => {
            // state.profileChangePasswordSuccessOrErrorTitle = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateFetchProfileData.pending, (state, action) => {
                state.isProfileDataLoading = true
            })
            .addCase(updateFetchProfileData.fulfilled, (state, action) => {
                state.isProfileDataLoading = false
                state.profileDataFetchMessage.successTitle = action.payload.title
                state.profileDataFetchMessage.errorTitle = ''
            })
            .addCase(updateFetchProfileData.rejected, (state, action) => {
                state.isProfileDataLoading = false
                state.profileDataFetchMessage.errorTitle = 'Ошибка!'
                state.profileDataFetchMessage.successTitle = ''
            })

            .addCase(resetPassword.pending, (state, action) => {
                state.isProfileChangePasswordLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isProfileChangePasswordLoading = false
                state.profileChangePasswordFetchMessage.errorTitle = ''
                state.profileChangePasswordFetchMessage.successTitle = action.payload.title
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isProfileChangePasswordLoading = false
                state.profileChangePasswordFetchMessage.errorTitle = action.payload || ''
                state.profileChangePasswordFetchMessage.successTitle = ''
            })
    }

})


export const {actions: profileActions} = profileSlice
export const {reducer: profileReducer} = profileSlice