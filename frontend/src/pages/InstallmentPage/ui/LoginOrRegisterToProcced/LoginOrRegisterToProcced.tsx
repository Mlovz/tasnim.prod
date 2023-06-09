import React, {FC, useCallback} from 'react';
import {Button,  HStack, Text} from "@/shared/ui";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {authModalActions} from "@/entities/AuthModal";

interface LoginOrRegisterToProccedProps{
    className?:string
}
const LoginOrRegisterToProcced:FC<LoginOrRegisterToProccedProps> = ({className=''}) => {
    const dispatch = useAppDispatch()

    const onOpenLogin = useCallback(() => {
        dispatch(authModalActions.setIsAuthModal({ isOpen: true, view: 'login' }))
    }, [])

    const onOpenRegister = useCallback(() => {
        dispatch(
            authModalActions.setIsAuthModal({ isOpen: true, view: 'register' })
        )
    }, [])

    return (
        <HStack align='center' gap={4} className={className}>
            <Button variant='clear' size={16} fw={500} onClick={onOpenLogin}>Войдите</Button>
            <Text as='span' fw={500}>или</Text>
            <Button variant='clear' size={16} fw={500} onClick={onOpenRegister}>зарегистрируйтесь</Button>
            , чтобы продолжить
        </HStack>
    );
};

export default LoginOrRegisterToProcced;
