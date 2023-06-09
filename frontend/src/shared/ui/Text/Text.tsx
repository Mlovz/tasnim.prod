import React, {FC, memo, ReactNode} from 'react';
import cls from './Text.module.scss'
import {classNames} from "@/shared/lib";



type TextAsType = 'h1' | 'h2' | 'p' | 'span'
export type TextSize = 12 | 14 | 16 | 18 | 22 | 36 | 50
export type TextWeight = 300 | 400 | 500 | 600 | 700
type TextAlign = 'center' | 'left' | 'right'
type TextVariant = 'error' | 'success'

interface TextProps{
    as?:TextAsType,
    size?:TextSize,
    className?:string,
    children: ReactNode,
    align?: TextAlign,
    fw?: TextWeight,
    variant?: TextVariant
}

const sizeClasses: Record<TextSize, string> = {
    12: cls.size12,
    14: cls.size14,
    16: cls.size16,
    18: cls.size18,
    22: cls.size22,
    36: cls.size36,
    50: cls.size50,
};

const fwClasses: Record<TextWeight, string> = {
    300: cls.fw300,
    400: cls.fw400,
    500: cls.fw500,
    600: cls.fw600,
    700: cls.fw700,
};

const alignClasses: Record<TextAlign, string> = {
    'center': cls.center,
    'left': cls.left,
    'right': cls.right,
};

const variantClasses: Record<TextVariant, string> = {
    'error': cls.error,
    'success': cls.success
};

const Text: FC<TextProps> = memo((
    {
        className,
        children,
        as = 'p',
        align,
        size = 16,
        fw,
        variant
    }) => {

    const classes = [
        className,
        variant && variantClasses[variant],
        size && sizeClasses[size],
        align && alignClasses[align],
        fw && fwClasses[fw]

    ];

    return (
        <>
            {as === 'h1' && <h1 className={classNames(cls.text, {}, classes)}>{children}</h1>}
            {as === 'h2' && <h2 className={classNames(cls.text, {}, classes)}>{children}</h2>}
            {as === 'p' && <p className={classNames(cls.text, {}, classes)}>{children}</p>}
            {as === 'span' && <span className={classNames(cls.text, {}, classes)}>{children}</span>}
        </>
    );
});

export default Text;
