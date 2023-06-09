import  cls from './ProfilePage.module.scss'
import {Profile} from "@/entities/Profile";
const ProfilePage = () => {
    return (
        <div className={cls.profile}>
            <Profile/>
        </div>
    );
};

export default ProfilePage;
