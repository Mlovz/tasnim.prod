import cls from './Calculator.module.scss'
import {CalculatorFields, CalculatorInfo, CalculatorTabs} from "./";
import {HStack, Text, VStack} from "@/shared/ui";
import {tarrifTabs} from "@/shared/conts/calculator";
import {useCalculate} from "@/shared/hooks/useCalculate";

const Calculator = () => {
    const {
        tarrif,
        setTarrif,
        changeTarrif,
        price, term,
        initialFee,
        result,
        handleChange,
        activeTarrif
    } = useCalculate()




    return (
        <VStack gap={40} align='center' className={cls.calculator}>
            <Text as='h2' size={36} align='center' fw={700}>Калькулятор рассрочки</Text>

            <CalculatorTabs tabs={tarrifTabs} value={tarrif.value} onTabClick={changeTarrif}/>

            <HStack max gap={40}>
                <CalculatorFields
                    price={price}
                    term={term}
                    initialFee={initialFee}
                    onChange={handleChange}
                />
                <CalculatorInfo price={price} result={result} tarrif={activeTarrif}/>
            </HStack>
        </VStack>
    );
};

export default Calculator;
