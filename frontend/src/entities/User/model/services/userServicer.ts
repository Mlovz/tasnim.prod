import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/store/config/StateSchema";
import {TOKEN_LOCALSTORAGE_KEY} from "@/shared/conts/localstorage";
import {userActions} from "@/entities/User";

export const refreshToken = createAsyncThunk<
    any, undefined, ThunkConfig<string>
>('user/refreshToken', async(_, thunkAPI) => {
    const {dispatch, extra, rejectWithValue} = thunkAPI

    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)

    if(token){
        try {
            const {data} = await extra.api.get('/refresh_token')

            if(!data){
                throw new Error()
            }

            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, data.access_token)
            dispatch(userActions.setAuthData(data))

            return data
        }catch (err: any){
            return rejectWithValue(err.response.data.message)
        }
    }

})