import {UserSchema} from '../types/user'
import {createSlice} from "@reduxjs/toolkit";
import {refreshToken} from "@/entities/User/model/services/userServicer";

const initialState: UserSchema = {
    authData: null,
    token: '',
    isLoading: false
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.authData = action.payload.user;
            state.token = action.payload.access_token
        },
        reset: (state) => {
            state.authData = null;
            state.token = ''
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.isLoading = false
            })
    }

})


export const {actions: userActions} = userSlice
export const {reducer: userReducer} = userSlice