import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

enum ResetPasswordSchemaType {
    PASSWORD = 'password',
    CF_PASSWORD = 'cf_password',
}
export const useResetPasswordSchema = () => {
    const schema = yup.object().shape({
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
        formState: { errors, isValid },
        watch,
        control,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            cf_password: '',
            password: '',
        }
    })

    return{
        register,
        handleSubmit,
        watch,
        control,
        errors,
        isValid,
        ResetPasswordSchemaType
    }
}