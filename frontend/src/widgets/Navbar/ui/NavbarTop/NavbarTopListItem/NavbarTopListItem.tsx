import React, {FC, memo} from 'react';
import cls from './NavbarTopListItem.module.scss'
import {NavbarItem, navTopSubItems} from "@/widgets/Navbar/model/navbar";
import {classNames} from "@/shared/lib";
import {AppLink, Text} from "@/shared/ui";
import {DropdownItem} from "@/shared/ui/Popups";
import Dropdown from "@/shared/ui/Popups/components/Dropdown/Dropdown";
import {getRouteNews, getRoutePartners, getRouteReviews, getRouteStock} from "@/shared/conts/router";

interface NavbarTopListItemProps {
    item: NavbarItem
}

const NavbarTopListItem: FC<NavbarTopListItemProps> = memo(({item}) => {
    const items: DropdownItem[] = [
        {
            content: <Text size={14} >Новости</Text>,
            href: getRouteNews()
        },
        {
            content: <Text size={14} >Акции</Text>,
            href: getRouteStock()
        },
        {
            content: <Text size={14} >Партнеры</Text>,
            href: getRoutePartners()
        },
        {
            content: <Text size={14} >Отзывы</Text>,
            href: getRouteReviews()
        },
    ]


    if (item.path) {
        return (
            <AppLink
                to={item.path}
                activeClassName={cls.active}
                className={classNames(cls.item, {}, [])}
            >
                {item.text}
            </AppLink>
        );
    }

    return (
        <Dropdown
            direction='bottom center'
            items={items}
            trigger={
                <Text className={cls.item} size={14} fw={500}>{item.text}</Text>
            }
        />
    );
});

export default NavbarTopListItem;
