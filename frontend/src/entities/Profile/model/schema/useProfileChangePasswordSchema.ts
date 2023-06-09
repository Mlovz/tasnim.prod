import { yupResolver } from '@hookform/resolvers/yup'
import {  useForm,  Controller } from 'react-hook-form'
import * as yup from 'yup'
import {useEffect} from "react";

enum   ProfileDataSchemaType{
    LAST_NAME = 'last_name',
    FIRST_NAME = 'first_name',
    MIDDLE_NAME = 'middle_name',
    NICK_NAME = 'nick_name',
    PHONE = 'phone',
    EMAIL = 'email',
}
export const useProfileDataSchema = (authData:any) => {
    const schema = yup.object().shape({
        last_name: yup.string(),
        first_name: yup.string().required('Поле не может быть пустым.'),
        middle_name: yup.string(),
        nick_name: yup.string()
            .required('Поле не может быть пустым.'),
        phone: yup.string()
            .required('Поле не может быть пустым.')
            .min(16, 'Минимальное количество символов (18) !')
            .max(16, 'Минимальное количество символов (18) !'),
        email: yup.string().email('Почта не валидна.')
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty, isSubmitting },
        watch,
        control,
        reset

    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            first_name: '',
            last_name: '',
            middle_name: '',
            nick_name: '',
            phone: '',
            email: '',
        }
    })

    useEffect(() => {
        if(authData){
            reset(authData)
        }
    },[reset, authData])

    return {
        register,
        handleSubmit,
        watch,
        control,
        errors,
        isValid,
        isDirty,
        ProfileDataSchemaType,
        Controller,
        isSubmitting
    }
}