import * as yup from "yup";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


enum ProfileChangePasswordType {
    OLD_PASSWORD = 'old_password',
    PASSWORD = 'password',
    CF_PASSWORD = 'cf_password',
}
export const useProfileChangePassword = () => {
    const schema = yup.object().shape({
        old_password: yup
            .string()
            .required('Поле Пароль обязательное!')
            .min(6, 'Минимальное количество символов (6).'),
        password: yup
            .string()
            .required('Поле Пароль обязательное!')
            .min(6, 'Минимальное количество символов (6).'),
        cf_password: yup
            .string()
            .required('Поле Пароль обязательное!')
            .min(6, 'Минимальное количество символов (6).')
            .oneOf([yup.ref('password')], 'Пароли не совпадают!'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        control,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            old_password: '',
            password: '',
            cf_password: '',
            send_a_new_password: ''
        }
    })

    return{
        register,
        handleSubmit,
        watch,
        control,
        errors,
        isValid,
        ProfileChangePasswordType,
        Controller,
        isSubmitting
    }
}