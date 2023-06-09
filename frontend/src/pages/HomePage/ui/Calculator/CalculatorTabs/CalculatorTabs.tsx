import cls from './CalculatorTabs.module.scss'
import {FC, memo, useCallback} from "react";
import {HStack} from "@/shared/ui";
import {classNames} from "@/shared/lib";

export interface CalculatorTabItem {
    value: any,
    content: string
}
 interface CalculatorTabsProps {
    className?: string;
    value: string;
    tabs: CalculatorTabItem[],
    onTabClick: (tab: CalculatorTabItem) => void;
}



const CalculatorTabs:FC<CalculatorTabsProps> = (props) => {
    const { className, tabs,  onTabClick, value,  } = props;


    const clickHandle = useCallback(
        (tab: CalculatorTabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <HStack className={classNames(cls.tabs, {}, [className || ''])}>
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <button
                        key={tab.value}
                        className={classNames(cls.tab, {
                            [cls.selected]: isSelected,
                        })}
                        onClick={clickHandle(tab)}
                    >
                        {tab.content}
                    </button>
                );
            })}
        </HStack>
    );
};

export default CalculatorTabs;
