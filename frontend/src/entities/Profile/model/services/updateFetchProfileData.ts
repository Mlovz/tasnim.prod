import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/store/config/StateSchema";
import {userActions} from "@/entities/User";


export const updateFetchProfileData = createAsyncThunk<
    any, any, ThunkConfig<string>
>('update/profile/data', async (params, thunkAPI) => {
    const {dispatch, extra, rejectWithValue, getState} = thunkAPI

    const user = getState().user.authData

    try {
        const newUser = {...user, ...params}
        const {data} = await extra.api.patch('/update/profile',  newUser)

        if(data){
            dispatch(userActions.setAuthData({user: newUser}))
        }

        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data.message)
    }
});