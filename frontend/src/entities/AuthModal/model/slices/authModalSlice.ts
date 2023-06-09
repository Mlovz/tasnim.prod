import {AuthModalSchema, AuthModalViewType} from "../types/authModal";
import {createSlice} from "@reduxjs/toolkit";


const initialState: AuthModalSchema = {
    isOpen: false,
    view: AuthModalViewType.LOGIN
}


const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        setIsAuthModal: (state, action) => {
            state.isOpen = action.payload.isOpen;
            state.view = action.payload.view;
        }
    }
})



export const {actions: authModalActions} = authModalSlice
export const {reducer: authModalReducer} = authModalSlice