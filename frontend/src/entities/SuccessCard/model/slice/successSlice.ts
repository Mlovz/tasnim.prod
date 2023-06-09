import {SuccessSchema} from "@/entities/SuccessCard/model/types/success";
import {createSlice} from "@reduxjs/toolkit";


const initialState: SuccessSchema = {
    isSuccess: false,
    title: '',
    content: ''
}


const successSlice = createSlice({
    name: 'success',
    initialState,
    reducers: {
        setSuccess: (state, action) => {
            state.isSuccess = true;
            state.title = action.payload.title;
            state.content = action.payload.content
        },

        setSuccessClear: (state) => {
            state.isSuccess = false;
            state.title = '';
            state.content = ''
        }
    }
})

export const {actions: successActions} = successSlice
export const {reducer: successReducer} = successSlice