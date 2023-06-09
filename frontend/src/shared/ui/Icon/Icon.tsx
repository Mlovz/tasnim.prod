import React, {FC, JSX, memo} from 'react';
import cls from './icon.module.scss'
import {icon, IconType} from "@/shared/ui/Icon/IconTypes";
import {classNames} from "@/shared/lib";


interface IconProps{
    type: any
    className?:string
    onClick?: () => void
}


const getIcon = (type: IconType):JSX.Element => icon.get(type) as JSX.Element

const Icon:FC<IconProps> = memo( ({className, type, onClick}) => {
    return (
        <div className={classNames(cls.icon, {}, [className || ''])} onClick={onClick}>
            {getIcon(type)}
        </div>
    );
});

export default Icon;
