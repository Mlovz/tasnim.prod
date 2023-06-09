import cls from './ProfileNavigation.module.scss'
import {profileNavItems} from "@/pages/ProfilePage/model/consts/profileNav";
import {AppLink, Icon} from "@/shared/ui";
import {useLocation} from "react-router-dom";

const ProfileNavigation = () => {
    const {pathname} = useLocation()


    const isActivePath = (path: string) => {
        if(pathname === path) return cls.active
    }

    return (
        <div className={cls.profileNav}>


            <ul className={cls.navList}>
                {
                    profileNavItems.map((item) => (
                        <li key={item.path} className={isActivePath(item.path)}>
                            <AppLink to={item.path} >
                                <Icon type={item.icon}/>
                                {item.content}
                            </AppLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProfileNavigation;
