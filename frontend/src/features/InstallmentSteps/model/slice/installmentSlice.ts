import {createSlice} from "@reduxjs/toolkit";
import {InstallmentSchema} from "../types/steps";
import {createInstallment} from "@/features/InstallmentSteps/model/services/installmentService";

const initialState: InstallmentSchema = {
    form: null,
    isLoading: false,
    error: ''
}

const installmentSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        updateInstallment: (state,action) => {
            state.form = {
                ...state.form,
                ...action.payload
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createInstallment.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createInstallment.fulfilled, (state, action) => {
                state.isLoading = false
                state.form = null
            })
            .addCase(createInstallment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || ''
            })
    }
})

export const {actions: installmentActions} = installmentSlice
export const {reducer: installmentReducer} = installmentSlice