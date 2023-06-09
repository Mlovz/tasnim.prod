import {FC, useCallback, useState} from 'react';
import cls from './InstallmentPage.module.scss'
import {InstallmentStepNavigation, LoginOrRegisterToProcced} from "../";
import { Text} from "@/shared/ui";
import {
    getStepsFormData,
    installmentReducer,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    StepProps
} from "@/features/InstallmentSteps";
import {useSelector} from "react-redux";
import {getUserToken} from "@/entities/User";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {useNavigate} from "react-router-dom";

const Steps: Record<number, FC<StepProps>> = {
    0: Step1,
    1: Step2,
    2: Step3,
    3: Step4,
    4: Step5,
}

const initialReducers: ReducersList = {
    installment: installmentReducer,
};

const InstallmentPage = () => {
    const labelArray = ['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4', 'Шаг 5']
    const [currentStep, setCurrentStep] = useState<number>(0)

    const isLogged = !!useSelector(getUserToken)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const Step = Steps[currentStep]
    const formData = useSelector(getStepsFormData)

    const onNext = () => {
        if (labelArray.length - 1 === currentStep) return
        setCurrentStep((prev) => prev + 1)
    }

    const onBack = () => {
        setCurrentStep((prev) => prev - 1)
    }


    const onCloseSuccessCard = useCallback(() => {
    },[dispatch])



    return (
        <div className='container'>
            <Text as='h1' size={36}>Заявка на рассрочку</Text>

            <div className={cls.installmentContent}>
                {
                    isLogged
                        ?
                        <DynamicModuleLoader reducers={initialReducers}>
                            <InstallmentStepNavigation labelArray={labelArray} step={currentStep}/>
                            <Step onNext={onNext} onBack={onBack} formData={formData}/>
                        </DynamicModuleLoader>
                        :
                        <LoginOrRegisterToProcced />
                }
            </div>
        </div>
    );
};

export default InstallmentPage;
