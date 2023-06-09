import React, {FC} from 'react';
import {Button, Form, Input, InputMask, Text, VStack} from "@/shared/ui";
import cls from "@/features/Auth/ui/ForgotPasswordForm/ForgotPasswordForm.module.scss";
import {useSelector} from "react-redux";
import {authActions, getAuthError} from "@/features/Auth";


import {useAppDispatch} from "@/shared/hooks/useStore";
import {authModalActions, AuthModalViewType} from "@/entities/AuthModal";
import {forgotPassword} from "@/features/Auth/model/services/authService";
import {getAuthLoading} from "@/features/Auth";
import {useForgotPhoneSchema} from "@/features/Auth/model/schema/useForgotPhoneSchema";

const ForgotPasswordCurrentForm:FC<any> = ({onOpenLogin}) => {
    const {
        watch,
        errors,
        isValid,
        handleSubmit,
        control,
        ForgotPhoneSchemaType
    } = useForgotPhoneSchema()


    const error = useSelector(getAuthError)
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getAuthLoading)

    const onSubmit = (data:any) => {
        dispatch(forgotPassword(data))
    }

    return (
        <>
            <VStack gap={28}>
                <div>
                    <Text as='h2' size={22} className={cls.forgotTitle}>Восстановление пароля</Text>
                    {error && <Text as='p' variant='error' fw={500} size={14} >{error}</Text>}
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={20}>
                        <Text as='p' size={16}>Мы отправим код подтверждения в SMS на Ваш номер телефона</Text>
                        <InputMask
                            control={control}
                            name={ForgotPhoneSchemaType.PHONE}
                            mask="+7(999)999-99-99"
                            maskPlaceholder=""
                            value={watch(ForgotPhoneSchemaType.PHONE)}
                            trigger={
                                <Input
                                    value={watch(ForgotPhoneSchemaType.PHONE)}
                                    error={errors?.phone}
                                    placeholder='Ваш телефон'
                                />
                            }
                        />
                        <Button type='submit' disabled={!isValid || isLoading} loading={isLoading} fullWidth>Получить код подтверждения</Button>
                    </VStack>
                </Form>
            </VStack>
            <Button
                className={cls.backBtn}
                variant='clear'
                onClick={onOpenLogin}
            >
                Назад
            </Button>
        </>
    );
};

export default ForgotPasswordCurrentForm;
