import cls from './InstallmentStepNavigation.module.scss'
import {FC, useEffect, useState} from "react";
import {classNames} from "@/shared/lib";

interface InstallmentStepNavigationProps {
    labelArray: string[]
    step: number
    className?: string
}
const InstallmentStepNavigation:FC<InstallmentStepNavigationProps> = ({labelArray, className, step }) => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth((100 / (labelArray.length - 1)) * step)
    }, [width, step])

    return (
        <div className={classNames(cls.stepNav, {}, [className || ''])}>
            <div
                className={cls.stepProgress}
                style={{
                    width: step > 0 ? `${width - 1}%` : '',
                }}
            />
            {labelArray.map((item: any, index: any) => (
                <div className={cls.stepitems} key={index}>
          <span
              className={classNames(
                  cls.stepItemText,
                  { [cls.active]: step >= index },
                  []
              )}
          >
            {item}
          </span>
                    <div
                        className={classNames(
                            cls.stepItemCircle,
                            { [cls.active]: step >= index, [cls.loading]: step === index },
                            []
                        )}
                    />
                </div>
            ))}
        </div>
    )
};

export default InstallmentStepNavigation;
