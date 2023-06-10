import {useEffect, useState} from "react";
import {ITariffItem, tariffItems, tarrifTabs} from "@/shared/conts/calculator";
import {CalculatorTabItem} from "@/pages/HomePage/ui/Calculator/CalculatorTabs/CalculatorTabs";

interface ICalculateTarrif {
    value: string,
    label: string
}

export const useCalculate = () => {
    const [tarrif, setTarrif] = useState<CalculatorTabItem>(tarrifTabs[0])
    const [price, setPrice] = useState<number>(0)
    const [term, setTerm] = useState<number>(1)
    const [initialFee, setInitialFee] = useState<number>(0)
    const [activeTarrif, setActiveTarrif] = useState<ITariffItem>(
        tariffItems[tarrif.value]
    )
    const initialFeeCoefficient = price > 50000 ? 0.4 : 0.25
    let initialFeePrice = Math.round(price * initialFeeCoefficient)

    const [result, setResult] = useState({
        monthlyPayment: 0,
        tradeMargin: 0,
        total: 0,
    })

    const calculate = () => {
        if (price > 0 && term > 0) {
            const sf = price - initialFee
            const totalCost = sf * activeTarrif.appreciationFactors[term - 1] + initialFee
            setResult({
                monthlyPayment: Math.round(
                    (totalCost - initialFee) / term
                ),
                total: Math.round(totalCost),
                tradeMargin: Math.round(totalCost - price),
            })
        }

        if (price < initialFee) {
            setInitialFee(price)
        }
    }

    const handleChange = ( event: any, type: string,) => {
        const value = typeof event === 'number' ? +event : +event.target.value
        switch (type) {
            case 'price':
                setPrice(value)
                setInitialFee(Math.round(value * initialFeeCoefficient) > initialFee
                    ? Math.round(value * initialFeeCoefficient)
                    : initialFee > value
                        ? value
                        : initialFee)


                break
            case 'term':
                setTerm(value)
                break
            case 'initialFee':
                setInitialFee(value)
                break
            default:
                return false
        }
    }

    const changeTarrif = (type: any) => {
        setTarrif(type)
        setActiveTarrif(tariffItems[type.value])
    }

    useEffect(() => {
        calculate()
    }, [price, tarrif, term, initialFee])

    useEffect(() => {
        if(price > 1000000){
            setPrice(1000000)
        }
    }, [price]);


    return{
        tarrif,
        setTarrif,
        changeTarrif,
        result,
        price,
        term,
        initialFee,
        handleChange,
        activeTarrif
    }
}