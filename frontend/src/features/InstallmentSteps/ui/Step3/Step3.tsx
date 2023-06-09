import {FC, useCallback} from 'react';
import cls from './Step3.module.scss'
import {useAppDispatch} from "@/shared/hooks/useStore";
import {installmentActions} from "../../model/slice/installmentSlice";
import {useStepThreeSchema} from "@/features/InstallmentSteps/model/schema/useStepThreeSchema";
import {Button, Form, HStack, Input, Text, VStack} from "@/shared/ui";
import {ListBox} from "@/shared/ui/Popups";
import {familyItems} from "@/features/InstallmentSteps/model/consts";
import {useSelector} from "react-redux";
import {getStepsFormData, StepProps} from "@/features/InstallmentSteps";
const Step3:FC<StepProps>= ({onNext, onBack, formData}) => {
    const {
        fields,
        watch,
        register,
        isValid,
        errors,
        handleSubmit,
        StepThreeSchemaType,
    } = useStepThreeSchema(formData)

    const dispatch = useAppDispatch()

    const onChangeMartial = useCallback((value:string) => {
        dispatch(installmentActions.updateInstallment({marital_status: value || ''}))
    },[dispatch])

    const onChangeHousing = useCallback((value:string) => {
        dispatch(installmentActions.updateInstallment({housing: value || ''}))
    },[dispatch])

    const onChangeCredits = useCallback((value:string) => {
        dispatch(installmentActions.updateInstallment({creditsAlimony: value || ''}))
    },[dispatch])

    const onSubmit = (data:any) => {
        if(onNext){
            dispatch(installmentActions.updateInstallment({...data}))
            onNext()
        }
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <VStack className={cls.step3} gap={28}>
                <VStack max>
                    <HStack wrap='wrap' gap={20} max>
                        {
                            fields.map((field, index) => (
                                <Input
                                    key={index}
                                    className={cls.field}
                                    {...register(field.refType)}
                                    value={watch(field.value)}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    error={field.error}
                                />
                            ))
                        }
                    </HStack>
                </VStack>
                <VStack max className={cls.selectFields}>
                    <HStack wrap='wrap' gap={20} max>
                        <ListBox
                            className={cls.field}
                            defaultValue='Семейное положение'
                            value={formData?.marital_status || ''}
                            items={familyItems.family_status}
                            onChange={onChangeMartial}
                            variant='input'
                            max
                        />
                        <Input
                            className={cls.field}
                            {...register(StepThreeSchemaType.NUM_CHILDREN)}
                            value={watch(StepThreeSchemaType.NUM_CHILDREN)}
                            placeholder='Количество детей'
                            error={errors?.number_of_children}
                            disabled={!formData?.marital_status}
                        />
                    </HStack>
                </VStack>
                <VStack max className={cls.selectFields}>
                    <HStack wrap='wrap' gap={20} max>
                        <ListBox
                            className={cls.field}
                            defaultValue='Жилье'
                            value={formData?.housing || ''}
                            items={familyItems.housing}
                            onChange={onChangeHousing}
                            variant='input'
                            max
                        />
                        <Input
                            className={cls.field}
                            {...register(StepThreeSchemaType.RENTAL)}
                            value={watch(StepThreeSchemaType.RENTAL)}
                            placeholder='Стоимость аренды, руб/мес'
                            error={errors?.rental_price}
                            disabled={!formData?.housing}
                        />
                    </HStack>
                </VStack>
                <VStack max className={cls.selectFields}>
                    <HStack wrap='wrap' gap={20} max>
                        <ListBox
                            className={cls.field}
                            defaultValue='Кредиты / алименты'
                            value={formData?.creditsAlimony || ''}
                            items={familyItems.credits_alimony}
                            onChange={onChangeCredits}
                            variant='input'
                            max
                        />
                        <Input
                            className={cls.field}
                            {...register(StepThreeSchemaType.ALIMONY)}
                            value={watch(StepThreeSchemaType.ALIMONY)}
                            placeholder='Оплата кредита/алиментов руб/мес'
                            required={false}
                            error={errors?.payment_of_loans_and_alimony}
                            disabled={!formData?.creditsAlimony}
                        />
                    </HStack>
                </VStack>

                <VStack gap={20}>
                    <Text as='p' size={12}>Нажимая на кнопку «Далее», Вы даете согласие на обработку персональных данных. Мы не передаем Ваши данные  третьим лицам.</Text>
                    <HStack gap={10}>
                        <Button variant='light' onClick={onBack}>Назад</Button>
                        <Button type='submit' disabled={!isValid}>Далее</Button>
                    </HStack>
                </VStack>
            </VStack>
        </Form>
    );
};

export default Step3;