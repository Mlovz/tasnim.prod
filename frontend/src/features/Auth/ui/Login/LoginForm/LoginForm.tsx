import React, { FC} from 'react';
import cls from './LoginForm.module.scss'
import {Button,  Checkbox, Form, HStack, Input, InputMask, Text, VStack} from "@/shared/ui";
import {useLoginSchema} from "@/features/Auth/model/schema/useLoginSchema";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {loginByPhone} from "@/features/Auth/model/services/authService";
import {useSelector} from "react-redux";
import {getAuthError, getAuthLoading} from "@/features/Auth";

interface onOpenRegisterProps{
    onOpenRegister: () => void
    onOpenForgot: () => void
}
const LoginForm:FC<onOpenRegisterProps> = ({onOpenRegister, onOpenForgot}) => {
    const {
        register,
        handleSubmit,
        watch,
        errors,
        isValid,
        LoginSchemaType,
        control,
        Controller
    } = useLoginSchema()

    const dispatch = useAppDispatch()
    const error = useSelector(getAuthError)
    const isLoading = useSelector(getAuthLoading)

    const onSubmit = (data: any) => {
        dispatch(loginByPhone(data))
    }

    return (
        <div className={cls.login}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={28}>
                    <div>
                        <Text as='h2' size={22} className={cls.loginTitle}>Вход или регистрация</Text>
                        {error && <Text as='p' size={14} fw={500} variant='error'>{error}</Text>}
                    </div>

                    <VStack gap={20} max>
                        <InputMask
                            control={control}
                            name={LoginSchemaType.PHONE}
                            mask="+7(999)999-99-99"
                            maskPlaceholder=""
                            value={watch(LoginSchemaType.PHONE)}
                            trigger={
                                <Input
                                    value={watch(LoginSchemaType.PHONE)}
                                    error={errors?.phone}
                                    placeholder='Ваш телефон'
                                />
                            }
                        />
                        <Input
                            {...register(LoginSchemaType.PASSWORD)}
                            value={watch(LoginSchemaType.PASSWORD)}
                            error={errors?.password}
                            type='password'
                            placeholder='Пароль'
                        />
                        <HStack justify='between' align='center' max>
                            <Controller
                                name="remember_me"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        id="remember_me"
                                        label="Запомнить пароль"
                                        checked={watch('remember_me')}
                                    />
                                )}
                            />
                            <Button variant='clear' onClick={onOpenForgot} size={14}>Забыли пароль?</Button>
                        </HStack>
                    </VStack>
                    <Button type='submit' loading={isLoading} disabled={!isValid || isLoading} fullWidth>Войти</Button>
                </VStack>
            </Form>
            <HStack justify='center' gap={4} className={cls.loginFooter}>
                <Text as='p' size={16}>Еще не зарегистрированы?</Text>
                <Button onClick={onOpenRegister} variant='clear' size={14}>Регистрация</Button>
            </HStack>
        </div>
    );
};

export default LoginForm;
