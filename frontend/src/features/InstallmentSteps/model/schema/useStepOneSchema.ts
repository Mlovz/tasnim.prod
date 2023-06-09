import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import {useEffect, useState} from "react";

export interface IFields {
    product_name: string
    quantity: number
    price: number
}
export const useStepOneSchema = (products: any) => {
    const formSchema = {
        product_name: yup.string().required('Поле не может быть пустым'),
        quantity: yup.string().required('Поле не может быть пустым'),
        price: yup.string().required('Поле не может быть пустым'),
    }

    const schema = yup.object().shape({
        products: yup
            .array()
            .of(yup.object().shape(formSchema))
            .required('Must have fields')
            .min(1, 'Minimum of 1 field'),
    })

    const {
        register,
        formState: { errors, isValid },
        control,
        watch,
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            products: [{ product_name: '', quantity: '', price: '' }],
        },
    })



    const { fields, append, remove, replace, update } = useFieldArray({
        name: 'products',
        control,
    })


    const [initial_fee, setInitialFee] = useState<number>(0)
    const [result, setResult] = useState({
        count: 0,
        price: 0,
    })


    useEffect(() => {
        const subscription = watch((value: any, { name, type }) => {
            const c = value.products.reduce(
                (acc: number, prev: IFields) =>
                    acc + Number(prev.price) * Number(prev.quantity),
                0
            )

            setResult({ ...result, price: c })
        })

        return () => subscription.unsubscribe()
    }, [watch])

    const appendField = (e: FormDataEvent) => {
        e.preventDefault()
        append({ product_name: '', quantity: '', price: '' })
    }

    const removeField = (index: number) => {
        remove(index)
    }

    useEffect(() => {
        if (products?.length) {
            replace(products)
        }
    }, [replace])

    useEffect(() => {
        const subscription = watch((value: any, { name, type }) =>
            value.products.forEach((item: any) => {
                if (item.price > 100000) {
                    item.price = 0
                }
                if (item.quantity > 50) {
                    item.quantity = 0
                }
            })
        )
        return () => subscription.unsubscribe()
    }, [watch])




    return {
        fields,
        register,
        handleSubmit,
        appendField,
        removeField,
        setResult,
        result,
        initial_fee,
        setInitialFee,
        errors,
        isValid,
        watch
    }
}