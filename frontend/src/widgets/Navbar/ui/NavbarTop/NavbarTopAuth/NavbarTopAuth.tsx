
import cls from './NavbarTopAuth.module.scss'
import {useSelector} from "react-redux";
import {getUserData} from "@/entities/User";
import { DropdownItem} from "@/shared/ui/Popups";
import {Avatar, Text} from '@/shared/ui'
import {getRouteProfile} from "@/shared/conts/router";
import React from "react";
import Dropdown from "@/shared/ui/Popups/components/Dropdown/Dropdown";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {logout} from "@/features/Auth/model/services/authService";

const NavbarTopAuth = () => {
    const user = useSelector(getUserData)
    const dispatch = useAppDispatch()

    const items: DropdownItem[] = [
        {
            content: <Text size={14} as='span'>Профиль</Text>,
            href: getRouteProfile()
        },
        {
            content: <Text size={14} as='span'>Личные данные</Text>,
            href: getRouteProfile()
        },
        {
            content: <Text size={14} as='span'>Мои покупки</Text>,
            href: getRouteProfile()
        },
        {
            content: <Text size={14} as='span'>Избранное</Text>,
            href: getRouteProfile()
        },
        {
            content: <Text size={14} variant='error' as='span'>Выйти</Text>,
            onClick: () => dispatch(logout())
        },
    ]

    return (
        <div className={cls.navUser}>
            <Dropdown
                direction='bottom left'
                items={items}
                trigger={
                <div className={cls.navUserAvatar}>
                    <Avatar size={28} src={user?.avatar} alt='Avatar'/>
                    {user?.first_name}
                </div>
                }
                menuClass={cls.dropdown}
            />
        </div>
    );
};

export default NavbarTopAuth;
