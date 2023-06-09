import  {FC} from 'react';
import cls from './CalculatorInfo.module.scss'
import {Button, HStack, List, Text, VStack} from "@/shared/ui";
import {getIntlPriceFormat} from "@/shared/helpers/getIntlPriceFormat";
import {getRouteInstallment} from "@/shared/conts/router";

interface CalculatorInfoProps{
    price: number
    result: {
        monthlyPayment: number
        tradeMargin: number
        total: number
    },
    tarrif: {
        mainConditions: string[]
        documents: string[]
    }
}
const CalculatorInfo:FC<CalculatorInfoProps> = ({price, result, tarrif}) => {
    return (
        <VStack gap={28} className={cls.calcInfo}>
            <VStack className={cls.calcInfoItem} gap={8}>
                <VStack>
                    <Text as='span' size={12}>Ежемесячный платеж</Text>
                    <Text as='h2' size={36} fw={700} className={cls.price}>{getIntlPriceFormat(result.monthlyPayment)}</Text>
                </VStack>
                <HStack justify='between' align='center' max>
                    <Text as='span' size={12}>Торговая наценка</Text>
                    <Text as='h2' size={16} fw={500}>{getIntlPriceFormat(result.tradeMargin)}</Text>
                </HStack>
                <HStack justify='between' align='center' max>
                    <Text as='span' size={12} >Итоговая стоимость</Text>
                    <Text as='h2' size={16} fw={500}>{getIntlPriceFormat(result.total)}</Text>
                </HStack>
            </VStack>
            <div  className={cls.calcInfoItem}>
                <List items={tarrif.mainConditions.slice(0, 2)} title='Условия:'/>
            </div>
            <div  className={cls.calcInfoItem}>
                <List items={tarrif.documents} title='Документы:'/>
            </div>
            <Button fullWidth path={getRouteInstallment()}>Оформить заявку</Button>
        </VStack>
    );
};

export default CalculatorInfo;
