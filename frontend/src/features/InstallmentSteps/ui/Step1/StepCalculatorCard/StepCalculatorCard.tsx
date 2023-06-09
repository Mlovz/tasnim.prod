import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import cls from './StepCalculatorCard.module.scss'

import {tariffItems, tarrifTabs, termTabs} from "@/shared/conts/calculator";
import {HStack, Text, VStack} from "@/shared/ui";
import {getIntlPriceFormat} from "@/shared/helpers/getIntlPriceFormat";
import {ListBox} from "@/shared/ui/Popups";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {installmentActions} from "@/features/InstallmentSteps";


interface StepCalculatorCardProps{
    price: number,
    count: number
    initial_fee:number
    setInitialFee:(value?:any) => void,
    term: any,
    tariff: string
}
const StepCalculatorCard:FC<StepCalculatorCardProps> = (props, context) => {
    const { price, setInitialFee,  initial_fee, count, term, tariff } = props


    const initialFeeCoefficient = price > 50000 ? 0.4 : 0.25
    const [activeTarrif, setActiveTarrif] = useState(tariffItems[tariff])
    const [result, setResult] = useState({
        monthlyPayment: 0,
        tradeMargin: 0,
        total: 0,
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (price) {
            setInitialFee(Number(Math.round(price * initialFeeCoefficient)))
        }
    }, [price])

    const calculate = () => {
        if (price > 0 && term > 0) {
            const SF = price - initial_fee

            const TOTAL_COST =
                SF * activeTarrif.appreciationFactors[term - 1] + initial_fee

            setResult({
                monthlyPayment: Math.round((TOTAL_COST - initial_fee) / term),
                total: Math.round(TOTAL_COST),
                tradeMargin: Math.round(TOTAL_COST - price),
            })

            dispatch(installmentActions.updateInstallment(
                {
                    monthlyPayment: Math.round((TOTAL_COST - initial_fee) / term),
                    total: Math.round(TOTAL_COST),
                    tradeMargin: Math.round(TOTAL_COST - price),
                    term,
                    price,
                    initial_fee,
                    tariff,
                    count,
                }
            ))
        }
    }

    const onChangeTariff = useCallback((value: string) => {
        dispatch(installmentActions.updateInstallment({tariff: value}))
        setActiveTarrif(tariffItems[value])
    },[dispatch])

    const onChangeTerm = useCallback((value: string) => {
        dispatch(installmentActions.updateInstallment({term: value}))
    },[dispatch])


    const changeInitial = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) > price) return
        setInitialFee(Number(e.target.value.replace(/\D/g, '')))
    }

    useEffect(() => {
        calculate()
    }, [price, tariff, term, initial_fee])

    return (
        <VStack className={cls.card} gap={24}>
            <VStack max className={cls.cardItem} gap={10}>
                <HStack justify='between' max>
                    <Text as='span' size={14}>Стоимость товаров</Text>
                    <Text as='span' size={16} fw={500}>{getIntlPriceFormat(price)}</Text>
                </HStack>
                <HStack justify='between' max>
                    <Text as='span' size={14}>Тариф</Text>
                    <ListBox
                        fw={500}
                        variant='clear'
                        onChange={onChangeTariff}
                        value={tariff}
                        items={tarrifTabs}
                        direction='bottom left'
                        className={cls.tarrifMenu}
                    />
                </HStack>
                <HStack justify='between' max>
                    <Text as='span' size={14}>Срок договора</Text>
                    <ListBox
                        fw={500}
                        variant='clear'
                        onChange={onChangeTerm}
                        value={term}
                        items={termTabs}
                        direction='bottom left'
                        className={cls.termMenu}
                    />
                </HStack>
                <HStack justify='between' max>
                    <Text as='span' size={14}>Первоначальный взнос</Text>
                    <HStack className={cls.inputEdit}>
                        <input
                            type="text"
                            value={initial_fee}
                            onChange={changeInitial}
                            required
                        />
                        ₽
                    </HStack>
                </HStack>
            </VStack>
            <VStack max gap={14}>
                <HStack justify='between' max>
                    <Text as='span' size={14} >Ежемесячный платеж</Text>
                    <Text as='span' size={16} fw={500} className={cls.mothly}>{getIntlPriceFormat(result.monthlyPayment)}</Text>
                </HStack>
                <HStack justify='between' max>
                    <Text as='span' size={14}>Итоговая стоимость</Text>
                    <Text as='span' size={16} fw={500}>{getIntlPriceFormat(result.total)}</Text>
                </HStack>
                <HStack justify='between' max>
                    <Text as='span' size={14}>Торговая наценка</Text>
                    <Text as='span' size={16} fw={500}>{getIntlPriceFormat(result.tradeMargin)}</Text>
                </HStack>
            </VStack>
        </VStack>
    );
};

export default StepCalculatorCard;
