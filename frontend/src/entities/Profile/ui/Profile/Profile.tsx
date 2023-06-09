import cls from './Profile.module.scss'
import ProfileData from "./ProfileData/ProfileData";
import ProfileChangePassword from "./ProfileChangePassword/ProfileChangePassword";
import {VStack} from "@/shared/ui";
const Profile = () => {



    return (
        <VStack gap={32}>
            <ProfileData/>
            <ProfileChangePassword/>
        </VStack>
    );
};

export default Profile;
