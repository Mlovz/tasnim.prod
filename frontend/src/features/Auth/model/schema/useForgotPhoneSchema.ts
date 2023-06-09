import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

enum ForgotPhoneSchemaType {
    PHONE = 'phone',
}
export const useForgotPhoneSchema = () => {
    const schema = yup.object().shape({
        phone: yup.string()
            .required('Поле Телефон обязательное!')
            .min(16, 'Минимальное количество символов (18) !')
            .max(16, 'Минимальное количество символов (18) !'),
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
        }
    })

    return{
        register,
        handleSubmit,
        watch,
        control,
        errors,
        isValid,
        ForgotPhoneSchemaType
    }
}