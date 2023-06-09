import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/store/config/StateSchema";
import axios from "axios";


export const getFetchCity = createAsyncThunk<any, undefined, ThunkConfig<string>>(
    'city/getCity',
    async (params, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi

        try {
            const res = await axios.get('https://ipapi.co/json')

           return res.data
        } catch (err: any) {
            return rejectWithValue('Город не найден')
        }
    }
)