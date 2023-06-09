import { yupResolver } from '@hookform/resolvers/yup'
import {  useForm,  Controller } from 'react-hook-form'
import * as yup from 'yup'

enum RegisterSchemaType {
    PHONE = 'phone',
    FIRST_NAME = 'first_name',
    PASSWORD = 'password',
    CF_PASSWORD = 'cf_password',
}
export const useRegisterSchema = () => {
    const schema = yup.object().shape({
        phone: yup.string()
            .required('Поле Телефон обязательное!')
            .min(16, 'Минимальное количество символов (18) !')
            .max(16, 'Минимальное количество символов (18) !'),
        first_name: yup.string().required('Поле Имя обязательное!'),
        password: yup
            .string()
            .required('Поле Пароль обязательное!')
            .min(6, 'Минимальное количество символов (6) !'),
        cf_password: yup
            .string()
            .required('Поле Пароль обязательное!')
            .min(6, 'Минимальное количество символов (6) !')
            .oneOf([yup.ref('password')], 'Пароли не совпадают!'),
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
            first_name: '',
            password: '',
            cf_password: ''
        }
    })


    return {
        register,
        handleSubmit,
        watch,
        control,
        errors,
        isValid,
        RegisterSchemaType,
        Controller
    }
}