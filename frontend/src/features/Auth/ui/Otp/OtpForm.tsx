import React, {FormEvent, useEffect, useRef, useState} from 'react';
import cls from './OtpForm.module.scss'
import {Button,  Form, HStack, OtpInput, Text, VStack} from "@/shared/ui";
import {useSelector} from "react-redux";
import {getAuthError, getAuthLoading, getAuthFormData, getAuthType} from "@/features/Auth";
import {RegisterByPhoneParams} from "@/features/Auth/model/types/auth";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {
    forgotPassword,
    forgotPasswordActive,
    otpByPhone,
    registerByPhone
} from "@/features/Auth/model/services/authService";

const OtpForm = () => {
    const [otp, setOtp] = useState('');
    const [count, setCount] = useState(59)
    const [start, setStart] = useState(true)
    const timerRef = useRef<any>()

    const dispatch = useAppDispatch()
    const authFormData = useSelector(getAuthFormData)
    const error = useSelector(getAuthError)
    const isLoading = useSelector(getAuthLoading)
    const authType = useSelector(getAuthType)

    const onSubmit = (e:FormEvent) => {
        e.preventDefault()

        if(authType === 'register'){
            const newData = {
                otp,
                hash: authFormData?.hash,
                token: authFormData?.active_token,
            }

            dispatch(otpByPhone(newData))
        }else{
            const newData = {
                otp,
                hash: authFormData?.hash,
                phone: authFormData?.phone
            }
            dispatch(forgotPasswordActive(newData))
        }

    }

    const onSubmitReplaceCode = async(e: FormEvent) => {
        e.preventDefault()
        let res;
        if(authType === 'register'){
            const newData:any = {
                phone: authFormData?.phone,
                first_name: authFormData?.first_name,
                password: authFormData?.password,
            }
            res = await dispatch(registerByPhone(newData))
        }else{
            const newData:any = {phone: authFormData?.phone}
            res = await dispatch(forgotPassword(newData))
        }

        if(res?.meta?.requestStatus === 'fulfilled'){
            setCount(59)
            setStart(true)
        }
    }

    useEffect(() => {
        if(!start) return

        timerRef.current = setInterval(() => {
            setCount(prev => prev - 1)
        },1000)

        return () => {
            clearInterval(timerRef.current)
        }
    },[start])

    useEffect(() => {
        if(count <= 0){
            clearInterval(timerRef.current)
            setStart(false)
        }
    }, [count]);


    return (
        <Form onSubmit={onSubmit}>
            <VStack gap={28}>

                <div>
                    <Text as='h2' size={22} className={cls.title}>Введите код подтверждения</Text>
                    {error && <Text as='p' size={14} fw={500} variant='error'>{error}</Text>}
                </div>

                <VStack gap={20} max>
                    <Text as='p' size={16}>Мы отправили код подтверждения на {authFormData?.phone}</Text>

                    <OtpInput numInputs={4} value={otp} onChange={setOtp}/>

                    <HStack max justify='center'>
                        {
                            count === 0
                                ?
                                <Button variant='clear' onClick={onSubmitReplaceCode}>Получить новый код</Button>
                                :
                                <Text as='p' size={12} >Получить новый код можно через 00: {count < 10 ? `0${count}`: count}</Text>
                        }
                    </HStack>
                </VStack>

                <Button type='submit' disabled={otp.length < 4 || isLoading} loading={isLoading} fullWidth>Отправить</Button>
            </VStack>
        </Form>
    );
};

export default OtpForm;
