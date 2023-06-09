import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';
import {classNames, Mods} from "@/shared/lib";

export type CardPadding = 15 | 25 | 35 | 40;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    max?: boolean;
    padding?: CardPadding;
    fullHeight?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    15: 'gap_15',
    25: 'gap_25',
    35: 'gap_35',
    40: 'gap_40',
};

const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        max,
        padding = '25',
        fullHeight,
        ...otherProps
    } = props;


    const classes = [
        className,
        cls[mapPaddingToClass[padding]],
    ]

    const mods: Mods = {
        [cls.max]: max,
        [cls.fullHeight]: fullHeight,
        [cls.fullWidth]: max,
    }

    return (
        <div
            className={classNames(cls.Card, mods, classes)}
            {...otherProps}
        >
            {children}
        </div>
    );
});

export default  Card
