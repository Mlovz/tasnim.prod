import cls from './Navbar.module.scss'
import {NavbarBottom, NavbarTop} from "@/widgets/Navbar/ui";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {useEffect} from "react";
import {cityActions} from "@/features/City";
const Navbar = () => {
    const dispatch = useAppDispatch()

    // const localCity = localStorage.getItem('city')

    useEffect(() => {
        dispatch(cityActions.setToggleCityPopup(true))
    },[dispatch])


    return (
        <div className={cls.navbar}>
            <NavbarTop/>
            <NavbarBottom/>
        </div>
    );
};

export default Navbar;
