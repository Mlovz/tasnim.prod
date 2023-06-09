import {createSlice} from '@reduxjs/toolkit'
import {AuthSchema} from "@/features/Auth";
import {
    forgotPassword,
    forgotPasswordActive,
    loginByPhone,
    otpByPhone,
    registerByPhone
} from "@/features/Auth/model/services/authService";



const initialState: AuthSchema = {
    isLoading: false,
    error: '',
    authFormData: null,
    success: {
        title: '',
        content: ''
    },
    type: 'register',
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setClearError: (state) => {
            state.error = ''
        },
        setUpdateType: (state, action) => {
            state.type = action.payload
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginByPhone.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(loginByPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ''
            })
            .addCase(loginByPhone.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

            .addCase(registerByPhone.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(registerByPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authFormData = action.payload
                state.error = ''
            })
            .addCase(registerByPhone.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

            .addCase(otpByPhone.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(otpByPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authFormData = null;
                state.error = '';
                state.success.title = 'Вы зарегистрированы!';
                state.success.content = 'Ваш аккаунт создан. Для оформления рассрочки может потребоваться ввод дополнительных данных в личном кабинете. ';
            })
            .addCase(otpByPhone.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

            .addCase(forgotPassword.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ''
                state.authFormData = action.payload
            })

            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

            .addCase(forgotPasswordActive.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(forgotPasswordActive.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ''
                state.authFormData = action.payload
            })

            .addCase(forgotPasswordActive.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })


    }
})


export const {actions: authActions} = authSlice
export const {reducer: authReducer} = authSlice