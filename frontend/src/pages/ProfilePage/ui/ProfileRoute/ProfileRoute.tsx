import ProfileNavigation from '../ProfileNavigation/ProfileNavigation'
import {Outlet} from 'react-router-dom'
import cls from './ProfileRoute.module.scss'
import {HStack, Text} from "@/shared/ui";

const ProfileRoute = () => {
    return (
        <div className={cls.profileRoute}>
        <Text size={50} as='h1'>Профиль</Text>
            <HStack gap={32} align='start' className={cls.profileRouteContent}>
                <ProfileNavigation/>
                <Outlet/>
            </HStack>
        </div>
    );
};

export default ProfileRoute;
