import React, {ChangeEvent, FC} from 'react';
import cls from './CalculatorFields.module.scss'
import {HStack, Text, VStack} from "@/shared/ui";
import {getIntlPriceFormat} from "@/shared/helpers/getIntlPriceFormat";

import Slider from 'rc-slider'

interface CalculatorFieldsProps{
    price: number
    initialFee: number
    term: number
    onChange: (e: ChangeEvent, value: any) => void
}

interface ISliderItem {
    title: string,
    min: any,
    max: any,
    titleValue: any,
    initialFeePrice?: number,
    inputType?: string,
    value?: number,
    type?:string,
    onlyTerm?:boolean,
    onChange: (e: ChangeEvent, value: any) => void
}
const CalculatorFields:FC<CalculatorFieldsProps> = ({price, initialFee, term, onChange}) => {
    const initialFeeCoefficient = price > 50000 ? 0.4 : 0.25
    let initialFeePrice = Math.round(price * initialFeeCoefficient)

    const initialFeeValue =
        Math.round(price * initialFeeCoefficient) > initialFee
            ? Math.round(price * initialFeeCoefficient)
            : initialFee > price
                ? price
                : initialFee


    const sliderItems: ISliderItem[] = [
        {
            title: 'Стоимость товаров',
            min: 100,
            max: 1000000,
            titleValue: price,
            inputType: 'price',
            onChange: (e: any) => onChange(e, 'price')
        },
        {
            title: 'Срок договора',
            min: 1,
            max: 12,
            titleValue: term,
            inputType: 'term',
            onlyTerm: true,
            onChange: (e: any) => onChange(e, 'term')
        },
        {
            title: 'Первоначальный взнос',
            min: initialFeePrice,
            max: price,
            titleValue: initialFeeValue,
            inputType: 'initialFee',
            initialFeePrice: initialFeePrice,
            value: initialFee || initialFeePrice,
            type: 'price',
            onChange: (e: any) => onChange(e, 'initialFee')
        },
    ]


    return (
        <VStack gap={40} className={cls.slider}>
            {
                sliderItems.map((item) => (
                    <VStack gap={10} max key={item.inputType}>
                        <Text size={12} as='span'>{item.title}</Text>
                        <input type='text' onChange={(e:any) => item.onChange(e, [item.inputType])} value={item.titleValue} className={cls.input} />
                        <Slider
                            min={item.min}
                            max={item.max}
                            value={item.value || item.titleValue}
                            onChange={(e:any) => item.onChange(e, [item.inputType])}
                            className="range-slider range-slider_calculator"
                        />
                        <HStack justify='between' align='center' max>
                            <Text size={12} as='span'>{item.onlyTerm ? `${item.min} мес` : item.initialFeePrice || item.type ? getIntlPriceFormat(item.min) : item.min}</Text>
                            <Text size={12} as='span'>{item.onlyTerm ? `${item.max} мес` : item.type ? getIntlPriceFormat(item.max) : item.max}</Text>
                        </HStack>
                    </VStack>
                ))
            }

        </VStack>
    );
};

export default CalculatorFields;
