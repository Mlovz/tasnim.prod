import cls from './PageLoader.module.scss'
import {Portal, Spinner} from "@/shared/ui";
import {FC} from "react";
import {useSelector} from "react-redux";
import {getUserLoading} from "@/entities/User";



const PageLoader = () => {
    const isLoading = useSelector(getUserLoading)

    if(isLoading){
        return (
            <Portal>
                <div className={cls.pageLoader}>
                    <Spinner/>
                </div>
            </Portal>
        );
    }
    return <div></div>
};

export default PageLoader;
