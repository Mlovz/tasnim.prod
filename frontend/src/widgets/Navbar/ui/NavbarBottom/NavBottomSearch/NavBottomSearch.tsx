import React from 'react';
import cls from './NavBottomSearch.module.scss'
import {HStack, Icon, IconType} from "@/shared/ui";
import {Popover} from "@/shared/ui/Popups";
const NavBottomSearch = () => {
    return (
        <HStack gap={12} className={cls.search}>
            <Popover trigger={
                <button className={cls.catalogBtn}>
                    <span></span>
                    Каталог
                </button>
            }>
                hello
            </Popover>

            <form className={cls.searchForm}>
                <input type="text" placeholder='Поиск на сайте'/>
                <button>
                    <Icon type={IconType.SEARCH}/>
                </button>
            </form>
        </HStack>
    );
};

export default NavBottomSearch;
