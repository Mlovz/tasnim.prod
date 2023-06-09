import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/store/config/StateSchema";
import {
    LoginByPhoneParams,
    PostFetchLoginByPhone,
    PostFetchRegisterByPhone,
    RegisterByPhoneParams
} from "@/features/Auth/model/types/auth";
import {TOKEN_LOCALSTORAGE_KEY} from "@/shared/conts/localstorage";
import {userActions} from "@/entities/User";
import {authModalActions, AuthModalViewType} from "@/entities/AuthModal";
import {profileActions} from "@/entities/Profile";


export const loginByPhone = createAsyncThunk<
    any, LoginByPhoneParams, ThunkConfig<string>
>('auth/login', async (params, thunkApi) => {
    const {dispatch, extra, rejectWithValue} = thunkApi
    try {
        const {data} = await extra.api.post<PostFetchLoginByPhone>('/login', {
            ...params,
            phone: params.phone,
            password: params.password
        })

        if (!data) {
            throw new Error();
        }

        if(data){
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, data.access_token)
            dispatch(userActions.setAuthData(data))
            dispatch(authModalActions.setIsAuthModal({isOpen: false}))
        }

        return data
    }catch (err: any){
        return rejectWithValue(err.response.data.message)
    }
})


export const registerByPhone = createAsyncThunk<
    any, RegisterByPhoneParams, ThunkConfig<string>
>('auth/register', async(params, thunkAPI) => {
    const {extra, dispatch, rejectWithValue, getState} = thunkAPI
    const authModal = getState().authModal

    try {

        const {data} = await extra.api.post<PostFetchRegisterByPhone>('/register', params)

        if(!data){
            throw new Error()
        }

        localStorage.setItem('registerData', JSON.stringify(data))

        if(authModal.view === AuthModalViewType.REGISTER){
            dispatch(authModalActions.setIsAuthModal({isOpen: true, view: AuthModalViewType.OTP}))
        }

        return data
    }catch (err: any){
        return rejectWithValue(err.response.data.message)
    }
})


export const otpByPhone = createAsyncThunk<
    any, PostFetchRegisterByPhone, ThunkConfig<string>
>('auth/otp', async(params, thunkAPI) => {
    const {dispatch, extra, rejectWithValue} = thunkAPI

    try {
        const {data} = await extra.api.post('/active', params)
        if (!data) {
            throw new Error()
        }

        dispatch(authModalActions.setIsAuthModal({isOpen: true, view: AuthModalViewType.SUCCESS}))

        return data
    }catch (err: any){
        return rejectWithValue(err.response.data.message)
    }
})


export const logout = createAsyncThunk<
    any, undefined, ThunkConfig<string>
>('auth/logout', async(_, thunkAPI) => {
    const {dispatch, extra, rejectWithValue} = thunkAPI

    try {
        const {data} = await extra.api.get('/logout')


        if(!data){
            throw new Error()
        }

        localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY)
        dispatch(userActions.reset())

    }catch (err: any){
        return rejectWithValue(err.response.data.message)
    }
})

export const forgotPassword = createAsyncThunk<
    any, any, ThunkConfig<string>
>('auth/forgot', async(params, thunkAPI) => {
    const {dispatch, extra, rejectWithValue} = thunkAPI

    try {
        const {data} = await extra.api.post('/forgot', {phone: params.phone})

        console.log(data)
        if(!data){
            throw new Error()
        }

        dispatch(authModalActions.setIsAuthModal({isOpen: true, view: AuthModalViewType.OTP}))


        return data
    }catch (err: any){
        return rejectWithValue(err.response.data.message)
    }
})

export const forgotPasswordActive = createAsyncThunk<
    any, PostFetchRegisterByPhone, ThunkConfig<string>
>('auth/forgot/active', async(params, thunkAPI) => {
    const {dispatch, extra, rejectWithValue} = thunkAPI

    try {
        const {data} = await extra.api.post('/forgot/active', params)

        console.log(data)
        if(!data){
            throw new Error()
        }

        dispatch(authModalActions.setIsAuthModal({isOpen: true, view: AuthModalViewType.RESET}))


        return data
    }catch (err: any){
        return rejectWithValue(err.response.data.message)
    }
})

export const resetPassword = createAsyncThunk<
    any, any, ThunkConfig<string>
>('auth/reset/password', async(params, thunkAPI) => {
    const {dispatch, extra, rejectWithValue, getState} = thunkAPI

    try {
        const {data} = await extra.api.post(`/reset/password/${params.id}`, {
            password: params.password,
            currentPassword: params?.old_password || ''
        })

        // if(params.type === 'profile'){
        //     dispatch(profileActions.setUpdateFetchTitle(''))
        // }

        if (!data) {
            throw new Error()
        }


        return data
    }catch (err: any){
        // if(params.type === 'profile'){
        //     return dispatch(profileActions.setUpdateFetchTitle(err.response.data.message))
        // }
        return rejectWithValue(err.response.data.message)
    }
})