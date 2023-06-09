import React, {FC} from 'react';
import cls from './Step2.module.scss'
import {useStepTwoSchema} from "@/features/InstallmentSteps/model/schema/useStepTwoSchema";
import {Button,  Form, HStack, Input, InputMask, Text, VStack} from "@/shared/ui";
import {installmentActions, StepProps} from "@/features/InstallmentSteps";
import {useAppDispatch} from "@/shared/hooks/useStore";

const Step2:FC<StepProps> = ({onNext, onBack, formData}) => {
    const {
        watch,
        register,
        errors,
        isValid,
        control,
        handleSubmit,
        StepTwoSchemaType
    } = useStepTwoSchema(formData)

    const dispatch = useAppDispatch()

    const onSubmit = (data: any) => {
        if(onNext){
            dispatch(installmentActions.updateInstallment({...data}))
            onNext()
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={40} className={cls.step2}>
                <VStack max gap={20}>
                    <Input
                        {...register(StepTwoSchemaType.LAST_NAME)}
                        value={watch(StepTwoSchemaType.LAST_NAME)}
                        placeholder='Фамилия'
                        error={errors?.last_name}
                    />
                    <Input
                        {...register(StepTwoSchemaType.FIRST_NAME)}
                        value={watch(StepTwoSchemaType.FIRST_NAME)}
                        placeholder='Имя'
                        error={errors?.first_name}
                    />
                    <Input
                        {...register(StepTwoSchemaType.MIDDLE_NAME)}
                        value={watch(StepTwoSchemaType.MIDDLE_NAME)}
                        placeholder='Отчество'
                        error={errors?.middle_name}
                    />

                    <InputMask
                        control={control}
                        name={StepTwoSchemaType.DATE}
                        mask="99-99-9999"
                        maskPlaceholder=""
                        value={watch(StepTwoSchemaType.DATE)}
                        trigger={
                            <Input
                                value={watch(StepTwoSchemaType.DATE)}
                                error={errors?.date_of_birth}
                                placeholder='Дата рождения'
                            />
                        }
                    />

                    <Input
                        {...register(StepTwoSchemaType.ADDRESS)}
                        value={watch(StepTwoSchemaType.ADDRESS)}
                        placeholder='Адрес фактического проживания *'
                        error={errors?.address}
                    />
                    <InputMask
                        control={control}
                        name={StepTwoSchemaType.PHONE}
                        mask="+7(999)999-99-99"
                        maskPlaceholder=""
                        value={watch(StepTwoSchemaType.PHONE)}
                        trigger={
                            <Input
                                value={watch(StepTwoSchemaType.PHONE)}
                                error={errors?.phone}
                                placeholder='Мобильный телефон с WhatsApp'
                            />
                        }
                    />
                </VStack>
                <VStack gap={20} max>
                    <Text as='p' size={12}>Нажимая на кнопку «Далее», Вы даете согласие на обработку персональных данных. Мы не передаем Ваши данные третьим лицам.</Text>

                    <HStack gap={10}>
                        <Button variant='light' onClick={onBack}>
                            Назад
                        </Button>
                        <Button type='submit' disabled={!isValid}>
                            Далее
                        </Button>
                    </HStack>
                </VStack>

            </VStack>
        </Form>
    );
};

export default Step2;
