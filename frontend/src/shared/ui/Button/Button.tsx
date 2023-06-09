import React, {ButtonHTMLAttributes, FC, memo, ReactNode} from 'react';
import cls from './Button.module.scss'
import {classNames, Mods} from "@/shared/lib";
import {AppLink, Spinner, Text, TextSize, TextWeight} from "@/shared/ui";


type ButtonVariantType = 'clear' | 'solid'| 'outline'| 'light'| 'filled'| 'arrow'


interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
    path?: string,
    children: ReactNode,
    className?: string,
    disabled?: boolean,
    variant?: ButtonVariantType,
    fullWidth?:boolean,
    loading?: boolean,
    addonRight?: ReactNode
    addonLeft?: ReactNode,
    size?: TextSize,
    fw?: TextWeight
    value?: any
}

const Button: FC<ButtonProps> = memo((
    {
        className,
        variant='solid',
        disabled= false,
        fullWidth,
        loading,
        children,
        addonRight,
        addonLeft,
        path,
        size,
        fw,
        value=false,
        ...rest
    }
) => {
    const mods: Mods = {
        [cls.disabled]: disabled,
        [cls[variant]]: true,
        [cls.full]: fullWidth,
        [cls.value]: value ? true : false,
        [cls.loading]: loading
    }

    const variantClasses: Record<ButtonVariantType, string> = {
        'clear': cls.clear,
        'solid':cls.solid,
        'outline':cls.outline,
        'light':cls.light,
        'filled': cls.filled,
        'arrow':cls.arrow
    }

    const classes = [
        className,
        variant && variantClasses[variant]
    ];

    return (
        <>
            {
                path
                    ?
                    <AppLink to={path} className={classNames(cls.btn, mods, classes)} >
                        {addonLeft}
                        <Text as='span' size={size} fw={fw}>{children}</Text>
                        {addonRight}
                    </AppLink>
                    :
                    <button className={classNames(cls.btn, mods, classes)} {...rest}>
                        {addonLeft}
                        {
                            loading && <Spinner className={cls.loading}/>
                        }
                        <Text className={cls.text} as='span' size={size} fw={fw}>{children}</Text>
                        {value && <div className={cls.defaultValue}>
                            {value}
                            <span>*</span>
                        </div>}
                        {addonRight}
                    </button>
            }
        </>

    );
});

export default Button;
