import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/store/config/StateSchema";
import {FetchCreateInstallment, IStepsFormData} from "@/features/InstallmentSteps/model/types/steps";
import {ImageUpload} from "@/shared/lib";
import {successActions} from "@/entities/SuccessCard";


export const createInstallment = createAsyncThunk<
    any,IStepsFormData, ThunkConfig<string>
> ('instalment/create', async(formData, thunkAPI) => {
    const {extra, dispatch, rejectWithValue} = thunkAPI

    let media: {
        url: string,
        public_id: string
    }[] = []

    try {
        const newImages = [
            formData?.files.person_photo,
            formData?.files.passport_first_page,
            formData?.files.passport_second_page,
        ]

        if (formData?.files) media = await ImageUpload(newImages)

        if(!media.length) return rejectWithValue('Ошибка при добавление файлов.')

        const {data} = await extra.api.post<FetchCreateInstallment>('/installment', {...formData, files: media})

        if(!data){
            throw  new Error()
        }


        dispatch(successActions.setSuccess({
            title: data.title,
            content: data.content,
        }))

        return data
    }catch (err: any){
        return rejectWithValue(err.response.data.message)
    }
})