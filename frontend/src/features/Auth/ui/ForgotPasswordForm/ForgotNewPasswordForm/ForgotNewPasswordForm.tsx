import React from 'react';
import {Button, Form, Input, Text, VStack} from "@/shared/ui";
import cls from "./ForgotNewPasswordForm.module.scss";
import {useResetPasswordSchema} from "@/features/Auth/model/schema/useResetPasswordSchema";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {loginByPhone, resetPassword} from "@/features/Auth/model/services/authService";
import {useSelector} from "react-redux";
import {getAuthFormData} from "@/features/Auth";

const ForgotNewPasswordForm = () => {
    const {
        register,
        watch,
        isValid,
        errors,
        handleSubmit,
        ResetPasswordSchemaType
    } = useResetPasswordSchema()

    const dispatch = useAppDispatch()
    const {phone, user}:any = useSelector(getAuthFormData)


    const onSubmit = async (data:any) => {
        const res = await dispatch(resetPassword({...data, id: user._id}))

        if(res?.meta?.requestStatus === 'fulfilled'){
            await dispatch(loginByPhone({phone, password: data?.cf_password}))
        }
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={28}>
                <Text as='h2' size={22} className={cls.title}>Придумайте новый пароль</Text>

                <VStack gap={20} max>
                    <Input
                        type='password'
                        placeholder='Новый пароль'
                        value={watch(ResetPasswordSchemaType.PASSWORD)}
                        {...register(ResetPasswordSchemaType.PASSWORD)}
                        error={errors?.password}
                    />
                    <Input
                        type='password'
                        placeholder='Подтверждение нового пароля'
                        value={watch(ResetPasswordSchemaType.CF_PASSWORD)}
                        {...register(ResetPasswordSchemaType.CF_PASSWORD)}
                        error={errors?.cf_password}
                    />

                    <Text as='p' size={12}>После нажатия кнопки “Сохранить” Ваш предыдущий пароль будет анулирован и будет использоваться только новый. </Text>
                </VStack>

                <Button type='submit' disabled={!isValid} fullWidth>Войти с новым паролем</Button>
            </VStack>
        </Form>
    );
};

export default ForgotNewPasswordForm;
