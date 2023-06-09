import React, {FC, useState} from 'react';
import cls from './StepOneForm.module.scss'
import {ListBox} from "@/shared/ui/Popups";
import {sellersOptions} from "@/features/InstallmentSteps/model/consts";
import { HStack, Input, VStack} from "@/shared/ui";
import Button from "@/shared/ui/Button/Button";
import {IFields} from "@/features/InstallmentSteps/model/schema/useStepOneSchema";

interface StepOneFormProps{
    register: any,
    watch: any,
    fields: IFields[]
}
const StepOneForm:FC<StepOneFormProps> = ({register, watch, fields}) => {
    const [seller, setSeller] = useState<any>()




    return (
        <VStack gap={20} className={cls.stepForm}>
            <ListBox
                defaultValue='Продавец'
                value={seller}
                items={sellersOptions}
                onChange={setSeller}
                max
            />

            {
                fields.map((field:any, index:any) => (
                    <div key={index}>
                        <Input
                            placeholder='Наименование или ссылка на товар'
                            {...register(`products.${index}.product_name`)}
                            value={watch(`products.${index}.product_name`)}
                        />

                        <HStack gap={20} max>
                            <Input
                                placeholder='Кол-во товара'
                                {...register(`products.${index}.quantity`)}
                                value={watch(`products.${index}.quantity`)}
                            />
                            <Input
                                placeholder='Цена за шт, ₽'
                                {...register(`products.${index}.price`)}
                                value={watch(`products.${index}.price`)}
                            />
                        </HStack>
                    </div>
                ))
            }



            <Button variant='clear' size={16} fw={500}>+ Добавить еще товар</Button>
        </VStack>
    );
};

export default StepOneForm;
