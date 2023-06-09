import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {useEffect} from "react";



enum StepThreeSchemaType {
    PLACE = 'place_of_work',
    ADDRESS = 'organization_address',
    CONTACTS = 'manager_contacts',
    POSITION = 'position',
    MAIN_INCOME = 'main_income',
    OTHER_INCOME = 'other_income',
    NUM_CHILDREN = 'number_of_children',
    RENTAL = 'rental_price',
    ALIMONY = 'payment_of_loans_and_alimony',
}

interface StepThreeSchemaFields {
    placeholder: string,
    required:boolean,
    refType: StepThreeSchemaType,
    value: StepThreeSchemaType,
    error: any
}
export const useStepThreeSchema = (formData: any) => {
    const schema = yup.object().shape({
        place_of_work: yup.string().required('Поле не может быть пустым'),
        organization_address: yup.string().required('Поле не может быть пустым'),
        manager_contacts: yup.string().required('Поле не может быть пустым'),
        position: yup.string().required('Поле не может быть пустым'),
        main_income: yup.string().required('Поле не может быть пустым'),
        other_income: yup.string().required('Поле не может быть пустым'),
        number_of_children: yup
            .number()
            .required('Поле не может быть пустым')
            .transform((value) =>
                isNaN(value) || value === null || value === undefined ? 0 : value
            )
            .positive('Поле должен быть числом'),
        rental_price: yup
            .number()
            .required('Поле не может быть пустым')
            .transform((value) =>
                isNaN(value) || value === null || value === undefined ? 0 : value
            )
            .positive('Поле должен быть числом'),
        payment_of_loans_and_alimony: yup
            .number()
            .required('Поле не может быть пустым')
            .transform((value) =>
                isNaN(value) || value === null || value === undefined ? 0 : value
            )
            .positive('Поле должен быть числом'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            place_of_work: '',
            organization_address: '',
            manager_contacts: '',
            position: '',
            main_income: '',
            other_income: '',
            number_of_children: '',
            rental_price: '',
            payment_of_loans_and_alimony: ''
        }
    })


    useEffect(() => {
        if(formData){
            reset(formData)
        }
    },[reset])



    const fields:StepThreeSchemaFields[] = [
        {
            placeholder: 'Место работы',
            required: true,
            refType: StepThreeSchemaType.PLACE,
            value: StepThreeSchemaType.PLACE,
            error: errors?.place_of_work
        },
        {
            placeholder: 'Адрес организации',
            required: true,
            refType: StepThreeSchemaType.ADDRESS,
            value: StepThreeSchemaType.ADDRESS,
            error: errors?.organization_address
        },
        {
            placeholder: 'Ваша должность',
            required: true,
            refType: StepThreeSchemaType.POSITION,
            value: StepThreeSchemaType.POSITION,
            error: errors?.position
        },

        {
            placeholder: 'Имя и телефон руководителя',
            required: true,
            refType: StepThreeSchemaType.CONTACTS,
            value: StepThreeSchemaType.CONTACTS,
            error: errors?.manager_contacts
        },
        {
            placeholder: 'Доход по основному месту работы',
            required: true,
            refType: StepThreeSchemaType.MAIN_INCOME,
            value: StepThreeSchemaType.MAIN_INCOME,
            error: errors?.main_income
        },
        {
            placeholder: 'Прочие доходы, если имеются',
            required: true,
            refType: StepThreeSchemaType.OTHER_INCOME,
            value: StepThreeSchemaType.OTHER_INCOME,
            error: errors?.other_income
        },
    ]

    return{
        StepThreeSchemaType,
        register,
        watch,
        isValid,
        errors,
        handleSubmit,
        fields,
    }
}