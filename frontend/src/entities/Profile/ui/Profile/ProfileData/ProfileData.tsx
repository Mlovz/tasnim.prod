import cls from './ProfileData.module.scss'
import {Button, Card, Form, HStack, Input, InputMask, Text, VStack} from "@/shared/ui";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {getUserData} from "@/entities/User";
import {useProfileDataSchema} from "@/entities/Profile/model/schema/useProfileChangePasswordSchema";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {updateFetchProfileData} from "@/entities/Profile/model/services/updateFetchProfileData";
import {getProfileDataFetchMessageError, getProfileDataFetchMessageSuccess, profileActions} from "@/entities/Profile";

const ProfileData = () => {
    const authData = useSelector(getUserData)

    const {
        register,
        watch,
        ProfileDataSchemaType,
        isValid,
        isDirty,
        errors,
        control,
        handleSubmit,
        isSubmitting
    } = useProfileDataSchema(authData)

    const dispatch = useAppDispatch()
    const error = useSelector(getProfileDataFetchMessageError)
    const success = useSelector(getProfileDataFetchMessageSuccess)

    const onSubmit = async(data:any) => {
        await dispatch(updateFetchProfileData(data))
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
                    <Text as='h2' size={18}>Данные профиля</Text>
                    {error && <Text as='h2' size={18} variant='error'>{error}</Text>}
                    {success && <Text as='h2' size={18} variant='success'>{success}</Text>}
                </VStack>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={20}>
                        <HStack gap={20} max>
                            <Input
                                placeholder='Имя'
                                value={watch(ProfileDataSchemaType.FIRST_NAME)}
                                {...register(ProfileDataSchemaType.FIRST_NAME)}
                                error={errors?.first_name}
                            />
                            <Input
                                placeholder='Фамилия'
                                value={watch(ProfileDataSchemaType.LAST_NAME)}
                                {...register(ProfileDataSchemaType.LAST_NAME)}
                                error={errors?.last_name}
                                required={false}
                            />
                            <Input
                                placeholder='Отчество'
                                value={watch(ProfileDataSchemaType.MIDDLE_NAME)}
                                {...register(ProfileDataSchemaType.MIDDLE_NAME)}
                                error={errors?.middle_name}
                                required={false}
                            />
                        </HStack>
                        <Input
                            placeholder='Логин'
                            value={watch(ProfileDataSchemaType.NICK_NAME)}
                            {...register(ProfileDataSchemaType.NICK_NAME)}
                            error={errors?.nick_name}
                        />
                        <InputMask
                            control={control}
                            name={ProfileDataSchemaType.PHONE}
                            mask="+7(999)999-99-99"
                            maskPlaceholder=""
                            value={watch(ProfileDataSchemaType.PHONE)}
                            trigger={
                                <Input
                                    value={watch(ProfileDataSchemaType.PHONE)}
                                    error={errors?.phone}
                                    placeholder='Телефон'
                                />
                            }
                        />
                        <Input
                            placeholder='Email'
                            value={watch(ProfileDataSchemaType.EMAIL)}
                            {...register(ProfileDataSchemaType.EMAIL)}
                            error={errors?.email}
                            required={false}
                        />
                    </VStack>

                    <VStack gap={20} className={cls.saveBtn}>
                        <Text as='p' size={12}>Нажимая на кнопку «Сохранить», Вы даете согласие на обработку персональных данных. Мы не передаем Ваши данные третьим лицам.</Text>

                        <Button disabled={!isValid || !isDirty || isSubmitting} loading={isSubmitting} >Сохранить</Button>
                    </VStack>

                </Form>
            </VStack>
        </Card>
    );
};

export default ProfileData;
