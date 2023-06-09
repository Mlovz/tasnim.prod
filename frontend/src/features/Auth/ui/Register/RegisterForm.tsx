import React, {FC} from 'react';
import cls from './RegisterForm.module.scss'
import {Button,  Checkbox, Form, HStack, Input, InputMask, Text, VStack} from "@/shared/ui";
import {useRegisterSchema} from "../../model/schema/useRegisterSchema";
import {useSelector} from "react-redux";
import {getAuthError, getAuthLoading} from "@/features/Auth";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {registerByPhone} from "@/features/Auth/model/services/authService";

interface RegisterFormProps{
    onOpenLogin: () => void
}
const RegisterForm:FC<RegisterFormProps> = ({onOpenLogin}) => {
    const {
        register,
        handleSubmit,
        watch,
        errors,
        isValid,
        RegisterSchemaType,
        control,
    } = useRegisterSchema()

    const dispatch = useAppDispatch()
    const error = useSelector(getAuthError)
    const isLoading = useSelector(getAuthLoading)


    const onSubmit = (data:any) => {
        const {phone, password, first_name} = data
        const newData = {
            phone,
            password,
            first_name
        };

        dispatch(registerByPhone(newData))
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={28}>
                    <div>
                        <Text as='h2' size={22} className={cls.title}>Вход или регистрация</Text>
                        {error && <Text as='p' fw={500} size={14} variant='error'>{error}</Text>}
                    </div>
                    <VStack gap={20} max>
                        <InputMask
                            control={control}
                            name={RegisterSchemaType.PHONE}
                            mask="+7(999)999-99-99"
                            maskPlaceholder=""
                            value={watch(RegisterSchemaType.PHONE)}
                            trigger={
                                <Input
                                    value={watch(RegisterSchemaType.PHONE)}
                                    error={errors?.phone}
                                    placeholder='Ваш телефон'
                                />
                            }
                        />
                        <Input
                            placeholder='Ваше имя'
                            {...register(RegisterSchemaType.FIRST_NAME)}
                            value={watch(RegisterSchemaType.FIRST_NAME)}
                            error={errors?.first_name}
                        />
                        <Input
                            type='password'
                            placeholder='Пароль'
                            {...register(RegisterSchemaType.PASSWORD)}
                            value={watch(RegisterSchemaType.PASSWORD)}
                            error={errors?.password}

                        />
                        <Input
                            type='password'
                            placeholder='Подтверждение пароля'
                            {...register(RegisterSchemaType.CF_PASSWORD)}
                            value={watch(RegisterSchemaType.CF_PASSWORD)}
                            error={errors?.cf_password}
                        />

                        <Text as='p' size={12}>Нажимая на кнопку «Получить код», на Ваш телефон будет отправлено SMS с кодом подтверждения.</Text>
                    </VStack>

                    <Button type='submit' loading={isLoading} disabled={!isValid || isLoading} fullWidth>Зарегистрироваться</Button>
                </VStack>
            </Form>
            <HStack justify='center' gap={4} className={cls.registerFooter}>
                <Text as='p' size={16}>Уже есть аккаунт?</Text>
                <Button onClick={onOpenLogin} variant='clear' size={14}>Войти</Button>
            </HStack>
        </>
    );
};

export default RegisterForm;
