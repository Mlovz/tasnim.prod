import {FC, useCallback, useState} from 'react'
import cls from './Step1.module.scss'
import { installmentActions, StepProps} from "../../index";
import {Button,  Form, HStack, Icon, IconType, Input, Text, VStack} from "@/shared/ui";
import { StepCalculatorCard} from "./";
import {ListBox} from "@/shared/ui/Popups";
import {sellersOptions} from "@/features/InstallmentSteps/model/consts";
import {useStepOneSchema} from "@/features/InstallmentSteps/model/schema/useStepOneSchema";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {tarrifTabs, termTabs} from "@/shared/conts/calculator";

const Step1:FC<StepProps> = ({onBack, onNext, formData}) => {
    const dispatch = useAppDispatch()

   const {
       fields,
       register,
       handleSubmit,
       watch,
       appendField,
       removeField,
       isValid,
       result,
       initial_fee,
       setInitialFee,
       errors
   } = useStepOneSchema(formData?.products)

    const [err, setErr] = useState('')



    const onChangeSeller = useCallback((value:string) => {
        dispatch(installmentActions.updateInstallment({seller: value || ''}))
        if(err){
            setErr('')
        }
    },[dispatch, err])

    const onSubmit = (data:any) => {
        if(!formData?.seller) {
            return setErr('Выберите продавца')
        }

        if(onNext){
            dispatch(installmentActions.updateInstallment({...data}))
            onNext()
        }
    }

    return (
        <Form className={cls.step1} onSubmit={handleSubmit(onSubmit)}>
            <HStack gap={28} align='start'>
                <VStack gap={20} className={cls.stepForm}>
                    <VStack gap={4} max>
                        <ListBox
                            defaultValue='Продавец'
                            value={formData?.seller || ''}
                            items={sellersOptions}
                            onChange={onChangeSeller}
                            // error='Выберите продавца'
                        />
                        {err && <Text as='span' size={12} className={cls.errorText}>{err}</Text>}
                    </VStack>

                    <VStack max>
                        {
                            fields.map((field, index) => (
                                <VStack gap={20} key={index} max className={cls.field}>
                                    <HStack max gap={20}>
                                        <Input
                                            placeholder='Наименование или ссылка на товар'
                                            {...register(`products.${index}.product_name`)}
                                            value={watch(`products.${index}.product_name`)}
                                            error={errors?.products?.[index]?.product_name}
                                        />
                                        {index> 0 && <Icon onClick={() => removeField(index)} type={IconType.CAN} />}
                                    </HStack>
                                    <HStack gap={20} max>
                                        <Input
                                            placeholder='Кол-во товара'
                                            {...register(`products.${index}.quantity`)}
                                            value={watch(`products.${index}.quantity`)}
                                            error={errors?.products?.[index]?.quantity}
                                        />
                                        <Input
                                            placeholder='Цена за шт, ₽'
                                            {...register(`products.${index}.price`)}
                                            value={watch(`products.${index}.price`)}
                                            error={errors?.products?.[index]?.price}
                                        />
                                    </HStack>
                                </VStack>
                            ))
                        }
                    </VStack>
                    <Button variant='clear' size={16} fw={500} onClick={(e:any) => appendField(e)}>+ Добавить еще товар</Button>
                </VStack>

                <StepCalculatorCard
                    term={formData?.term || termTabs[0].value}
                    tariff={formData?.tariff || tarrifTabs[0].value}
                    price={result.price}
                    count={result.count}
                    initial_fee={initial_fee}
                    setInitialFee={setInitialFee}
                />
            </HStack>
            <HStack gap={20} className={cls.stepBtn}>
                <Button type='submit' disabled={!isValid}>Далее</Button>
                <Text as='p' size={12}>Нажимая на кнопку «Далее», Вы даете согласие на обработку персональных данных. Мы
                    не передаем Ваши данные третьим лицам.</Text>
            </HStack>
        </Form>
    );
};

export default Step1;
