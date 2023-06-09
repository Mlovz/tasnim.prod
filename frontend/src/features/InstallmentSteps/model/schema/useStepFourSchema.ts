import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {useEffect} from "react";

export const useStepFourSchema = (user_relatives:any) => {
    const formSchema = {
        name: yup.string().required('Поле не может быть пустым'),
        degree: yup.string().required('Поле не может быть пустым'),
        phone: yup
            .string()
            .required('Поле не может быть пустым')
            .min(16, 'Минимальное количество символов (16).')
            .max(17, 'Минимальное количество символов (16).'),
    }

    const schema = yup.object().shape({
        user_relatives: yup
            .array()
            .of(yup.object().shape(formSchema))
            .required('Must have fields')
            .min(1, 'Minimum of 1 field'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        control,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            user_relatives: [
                { name: '', degree: '', phone: '' },
                { name: '', degree: '', phone: '' },
                { name: '', degree: '', phone: '' },
            ],
        },
        resolver: yupResolver(schema),
    })

    const { fields, append, remove, replace, update } = useFieldArray({
        name: 'user_relatives',
        control,
    })



    useEffect(() => {
        if (user_relatives?.length) {
            replace(user_relatives)
        }
    }, [replace])

    return{
        register,
        handleSubmit,
        fields,
        errors,
        isValid,
        watch,
        control
    }
}