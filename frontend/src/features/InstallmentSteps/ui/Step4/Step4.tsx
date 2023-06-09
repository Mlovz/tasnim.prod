import React, {FC} from 'react';
import cls from './Step4.module.scss'
import {useStepFourSchema} from "@/features/InstallmentSteps/model/schema/useStepFourSchema";
import {Button, Form, HStack, Input, InputMask, Text, VStack} from "@/shared/ui";
import {installmentActions, StepProps} from "@/features/InstallmentSteps";
import {classNames} from "@/shared/lib";
import {useAppDispatch} from "@/shared/hooks/useStore";
const Step4:FC<StepProps> = ({onNext, onBack, formData}) => {
    const {
        register,
        handleSubmit,
        fields,
        errors,
        isValid,
        watch,
        control
    } = useStepFourSchema(formData?.user_relatives)

    const dispatch = useAppDispatch()

    const onSubmit = (data: any) => {
        if(onNext){
            dispatch(installmentActions.updateInstallment({...data}))
            onNext()
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
            <VStack gap={28}>
                {
                    fields.map((field, index) => (
                        <HStack
                            key={index}
                            gap={20}
                            wrap='wrap'
                            className={classNames(cls.formBlock)}>
                            <Input
                                className={cls.field}
                                placeholder={`Имя ${index + 1}-го родственника`}
                                {...register(`user_relatives.${index}.name`)}
                                value={watch(`user_relatives.${index}.name`)}
                                error={errors?.user_relatives?.[index]?.name}
                            />
                            <Input
                                className={cls.field}
                                placeholder="Степень родства, (например, отец, сестра, ..)"
                                {...register(`user_relatives.${index}.degree`)}
                                value={watch(`user_relatives.${index}.degree`)}
                                error={errors?.user_relatives?.[index]?.degree}
                            />

                            <InputMask
                                control={control}
                                name={`user_relatives.${index}.phone`}
                                mask="+7(999)999-99-99"
                                maskPlaceholder=""
                                value={watch(`user_relatives.${index}.phone`)}
                                trigger={
                                    <Input
                                        className={cls.field}
                                        placeholder="Номер телефона"
                                        value={watch(`user_relatives.${index}.phone`)}
                                        error={errors?.user_relatives?.[index]?.phone}
                                    />
                                }
                            />
                        </HStack>
                    ))
                }

                <VStack max gap={20} className={cls.formFooter}>
                    <Text as='p' size={12}>Нажимая на кнопку «Далее», Вы даете согласие на обработку персональных данных. Мы не передаем Ваши данные  третьим лицам.</Text>
                    <HStack gap={10}>
                        <Button variant='light' onClick={onBack}>
                            Назад
                        </Button>
                        <Button type='submit'>
                            Далее
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </Form>
    );
};

export default Step4;