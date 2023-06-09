import React, {FC, memo, ReactNode} from 'react';
import cls from './List.module.scss'
import {VStack} from "@/shared/ui";


interface ListProps{
    items: string[]
    title: string
    children?: ReactNode
    className?:string
}
export const List:FC<ListProps> = memo(({items, title,children}) => {
    return (
        <VStack gap={10} className={cls.list}>
            <div className={cls.title}>{title}</div>

            <ul className={cls.listItems}>
                {
                    items.map((item) => (
                        <li key={item} className={cls.listItem}>
                            <span className={cls.circle}></span>
                            {item}
                        </li>
                    ))
                }
            </ul>
        </VStack>
    );
});

