import cls from './ProfileChangePassword.module.scss'
import {Button, Card, Checkbox, Form, HStack, Input, InputMask, Text, VStack} from "@/shared/ui";
import {useProfileChangePassword} from "@/entities/Profile/model/schema/useProfileDataSchema";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {resetPassword} from "@/features/Auth/model/services/authService";
import {useSelector} from "react-redux";
import {getUserData} from "@/entities/User";
import React, {useEffect} from "react";
import {
    getProfileChangePasswordFetchMessageError,
    getProfileChangePasswordFetchMessageSuccess, profileActions
} from "@/entities/Profile";
const ProfileChangePassword = () => {
    const {
        register,
        watch,
        isValid,
        ProfileChangePasswordType,
        errors,
        Controller,
        control,
        handleSubmit,
        isSubmitting,
        reset
    } = useProfileChangePassword()

    const dispatch = useAppDispatch()
    const authData = useSelector(getUserData)
    const success = useSelector(getProfileChangePasswordFetchMessageSuccess)
    const error = useSelector(getProfileChangePasswordFetchMessageError)

    const onSubmit = async(data: any) => {
        await dispatch(resetPassword({...data, id: authData?._id, type: 'profile'}))
        reset({})
    }

    useEffect(() => {
        if(error || success){
            dispatch(profileActions.setUpdateFetchTitle())
        }
    },[])

    return (
        <Card padding={40} max>
            <VStack gap={28}>
                <VStack gap={10}>
                    <Text as='h2' size={18}>Изменение пароля</Text>
                    {error && <Text as='h2' size={18} variant='error'>{error}</Text>}
                    {success && <Text as='h2' size={18} variant='success'>{success}</Text>}
                </VStack>
                <Form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={20} max>
                        <Input
                            type='password'
                            placeholder='Действующий пароль'
                            value={watch(ProfileChangePasswordType.OLD_PASSWORD)}
                            {...register(ProfileChangePasswordType.OLD_PASSWORD)}
                            error={errors?.old_password}
                        />

                        <Input
                            type='password'
                            placeholder='Новый пароль'
                            value={watch(ProfileChangePasswordType.PASSWORD)}
                            {...register(ProfileChangePasswordType.PASSWORD)}
                            error={errors?.password}
                        />

                        <Input
                            type='password'
                            placeholder='Подтверждение нового пароля'
                            value={watch(ProfileChangePasswordType.CF_PASSWORD)}
                            {...register(ProfileChangePasswordType.CF_PASSWORD)}
                            error={errors?.cf_password}
                        />
                    </VStack>

                    <VStack gap={20} className={cls.saveBtn}>
                        <Controller
                            name="send_a_new_password"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    {...field}
                                    id="send_a_new_password"
                                    label="Отправить новый пароль на ваш телефон"
                                    checked={watch('send_a_new_password')}
                                />
                            )}
                        />

                        <Button disabled={!isValid || isSubmitting} loading={isSubmitting}>Сохранить</Button>
                    </VStack>

                </Form>
            </VStack>
        </Card>
    );
};

export default ProfileChangePassword;
