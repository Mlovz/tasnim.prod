import {CitySchema, getFetchCity} from "@/features/City";
import {createSlice} from "@reduxjs/toolkit";
import {actions} from "@storybook/addon-actions";


const initialState: CitySchema = {
    city: '',
    isOpenPopup: false,
    isOpenModal: false,
    error: ''
}


const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setSaveCity: (state, action) => {
            console.log(action.payload)
            state.city = action.payload;
            state.isOpenModal = false;
            state.isOpenPopup = false
        },
        setToggleCityModal: (state, action) => {
            state.isOpenModal = action.payload
        },
        setToggleCityPopup: (state, action) => {
            state.isOpenPopup = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFetchCity.pending, (state, action) => {
                state.error = ''
            })
            .addCase(getFetchCity.fulfilled, (state, action) => {
                state.city = action.payload.city
            })
            .addCase(getFetchCity.rejected, (state, action) => {
                console.log(action.payload)
                state.error = action.payload
            })
    }
})


export const {actions: cityActions} = citySlice
export const {reducer: cityReducer} = citySlice