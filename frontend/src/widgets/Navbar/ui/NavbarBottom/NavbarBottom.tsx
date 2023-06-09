import React from 'react';
import cls from './NavbarBottom.module.scss'

import Logo from '@/shared/assets/Logo.png'
import {NavBottomListItem, NavBottomSearch} from "@/widgets/Navbar/ui/NavbarBottom";
import {AppLink, HStack} from "@/shared/ui";
import {navBottomItems} from "@/widgets/Navbar/model/navbar";
export const NavbarBottom = () => {
    return (
        <div className={cls.navBottom}>
            <div className="container">
                <HStack justify='between' align='center' className={cls.wrap}>
                    <AppLink to='/'><img src={Logo} alt=""/></AppLink>

                    <NavBottomSearch/>

                    <HStack gap={24}>
                        {navBottomItems.map((item) => (
                            <NavBottomListItem key={item.path} item={item}/>
                        ))}
                    </HStack>
                </HStack>
            </div>
        </div>
    );
};

