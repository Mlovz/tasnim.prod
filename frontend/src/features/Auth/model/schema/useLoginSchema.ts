import { yupResolver } from '@hookform/resolvers/yup'
import {  useForm,  Controller } from 'react-hook-form'
import * as yup from 'yup'

 enum LoginSchemaType {
    PHONE = 'phone',
    PASSWORD = 'password',
}
export const useLoginSchema = () => {
    const schema = yup.object().shape({
        phone: yup.string()
            .required('Поле Телефон обязательное!')
            .min(16, 'Минимальное количество символов (18) !')
            .max(16, 'Минимальное количество символов (18) !'),
        password: yup
            .string()
            .required('Поле Пароль обязательное!')
            .min(6, 'Минимальное количество символов (6) !'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        control,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            phone: '',
            password: '',
            remember_me: false
        }
    })


    return {
        register,
        handleSubmit,
        watch,
        control,
        errors,
        isValid,
        LoginSchemaType,
        Controller
    }
}