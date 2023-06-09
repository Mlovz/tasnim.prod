import { useCallback, useEffect, useMemo} from 'react';
import cls from './NavbarTop.module.scss'
import {HStack, IconType, Modal, Text, Icon} from "@/shared/ui";
import {navTopItems} from "@/widgets/Navbar/model/navbar";
import NavbarTopListItem from "@/widgets/Navbar/ui/NavbarTop/NavbarTopListItem/NavbarTopListItem";
import {CityPopup, getFetchCity, CityModal} from "@/features/City";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {useSelector} from "react-redux";
import {authModalActions, AuthModalViewType, getAuthModalData} from "@/entities/AuthModal";
import {
    authActions,
    authReducer,
    AuthSuccessCard,
    ForgotPasswordForm,
    LoginForm,
    OtpForm,
    RegisterForm
} from "@/features/Auth";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib";
import {getUserToken} from "@/entities/User";
import NavbarTopAuth from "@/widgets/Navbar/ui/NavbarTop/NavbarTopAuth/NavbarTopAuth";
import ForgotNewPasswordForm from "@/features/Auth/ui/ForgotPasswordForm/ForgotNewPasswordForm/ForgotNewPasswordForm";

const initialReducers: ReducersList = {
    auth: authReducer,
};

const AuthFormStep: Record<AuthModalViewType, any> = {
    [AuthModalViewType.LOGIN]: LoginForm,
    [AuthModalViewType.REGISTER]: RegisterForm,
    [AuthModalViewType.FORGOT]: ForgotPasswordForm,
    [AuthModalViewType.OTP]: OtpForm,
    [AuthModalViewType.SUCCESS]: AuthSuccessCard,
    [AuthModalViewType.RESET]: ForgotNewPasswordForm
}
export const NavbarTop = () => {
    const dispatch = useAppDispatch()
    const authModal = useSelector(getAuthModalData)
    const isLogged = !!useSelector(getUserToken)

    const Component = AuthFormStep[authModal.view]


    useEffect(() => {
        dispatch(getFetchCity())
    },[dispatch])


    const onOpen = useCallback(() => {
        dispatch(authModalActions.setIsAuthModal({isOpen: true, view: AuthModalViewType.LOGIN}))
    },[])

    const onOpenRegister = useCallback(() => {
        dispatch(authModalActions.setIsAuthModal({isOpen: true, view: AuthModalViewType.REGISTER}))
        dispatch(authActions.setClearError())
        dispatch(authActions.setUpdateType('register'))
    },[])

    const onOpenForgot = useCallback(() => {
        dispatch(authModalActions.setIsAuthModal({isOpen: true, view: AuthModalViewType.FORGOT}))
        dispatch(authActions.setClearError())
        dispatch(authActions.setUpdateType('forgot'))
    },[])

    const onClose = useCallback(() => {
        // dispatch(authModalActions.setIsAuthModal({ isOpen: false, view: AuthModalViewType.LOGIN}))
        dispatch(authModalActions.setIsAuthModal({...authModal, isOpen: false}))
    },[])

    const itemsList = useMemo(
        () =>
            navTopItems.map((item) => (
                <NavbarTopListItem
                    key={item.path}
                    item={item}
                />
            )),
        [ navTopItems],
    );

    return (
        <div className={cls.navTop}>
            <div className="container">
                <HStack justify='between' align='center' className={cls.wrap}>
                    <CityPopup />
                    <CityModal />

                    <HStack gap={36}>
                        {itemsList}
                    </HStack>

                    {
                        isLogged
                            ?
                            <NavbarTopAuth/>
                            :
                            <HStack gap={10} className={cls.login} onClick={onOpen}>
                                <Icon type={IconType.LOGIN}/>
                                <Text as='span' size={14} >Войти</Text>
                            </HStack>
                    }

                </HStack>

                <Modal isOpen={authModal.isOpen} onClose={onClose}>
                    {
                       authModal.isOpen && <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>

                            <Component
                                onOpenRegister={onOpenRegister}
                                onOpenForgot={onOpenForgot}
                                onOpenLogin={onOpen}
                            />

                        </DynamicModuleLoader>
                    }
                </Modal>
            </div>
        </div>
    );
};


