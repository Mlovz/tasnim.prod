import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useEffect} from "react";

enum StepTwoSchemaType {
    LAST_NAME = 'last_name',
    FIRST_NAME = 'first_name',
    MIDDLE_NAME = 'middle_name',
    DATE = 'date_of_birth',
    ADDRESS = 'address',
    PHONE = 'phone',
}
export const useStepTwoSchema = (formData: any) => {
    const schema = yup.object().shape({
        last_name: yup.string().required('Поле не может быть пустым'),
        first_name: yup.string().required('Поле не может быть пустым'),
        middle_name: yup.string().required('Поле не может быть пустым'),
        date_of_birth: yup.string().required('Поле не может быть пустым'),
        address: yup.string().required('Поле не может быть пустым'),
        phone: yup
            .string()
            .required('Поле не может быть пустым')
            .min(16, 'Минимальное количество символов (16) !')
            .max(16, 'Минимальное количество символов (16) !'),
    })

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        watch,
        reset,
        control,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            last_name: '',
            first_name:  '',
            middle_name: '',
            date_of_birth:  '',
            address:  '',
            phone: '',
        }
    })


    useEffect(() => {
        if(formData){
            reset(formData)
        }
    }, [reset])

    return {
        register,
        errors,
        isValid,
        handleSubmit,
        watch,
        control,
        StepTwoSchemaType
    }
}