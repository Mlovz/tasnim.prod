import React, {FC, memo} from 'react';
import cls from './NavBottomListItem.module.scss'
import {NavbarBottomItem} from "@/widgets/Navbar/model/navbar";
import {Icon, AppLink} from "@/shared/ui";

interface  NavBottomListItemProps{
    item: NavbarBottomItem
}

const NavBottomListItem:FC<NavBottomListItemProps> = memo(({item}) => {
    return (
        <AppLink
            to={item.path}
            activeClassName={cls.active}
            className={cls.item}
        >
            <Icon type={item.iconType}/>
            {item.text}
        </AppLink>
    );
});

export default NavBottomListItem;
