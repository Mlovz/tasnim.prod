import React, {memo, useCallback} from 'react';
import cls from "./CityPopup.module.scss";
import {Button,  HStack, Icon, IconType, Text, VStack} from "@/shared/ui";
import {useSelector} from "react-redux";
import {cityActions, getCityValue, getIsOpenCityPopup} from "@/features/City";
import {classNames} from "@/shared/lib";
import {useAppDispatch} from "@/shared/hooks/useStore";

export const CityPopup = memo(() => {
    const dispatch = useAppDispatch()
    const isOpenCityPopup = useSelector(getIsOpenCityPopup)
    const cityValue = useSelector(getCityValue)

    const handleSelectCity = useCallback(() => {
        dispatch(cityActions.setSaveCity(cityValue))
    },[cityValue])

    const onOpenCityModal = useCallback(() => {
        dispatch(cityActions.setToggleCityModal(true))
        dispatch(cityActions.setToggleCityPopup(false))
    },[])

    return (
        <HStack gap={10} className={cls.city}>
            <HStack gap={10} className={cls.city} onClick={onOpenCityModal}>
                <Icon type={IconType.LOCATION}/>
                <Text as='span' size={14} className={cls.cityText}>{cityValue || ''}</Text>
            </HStack>

            <VStack gap={14} className={classNames(cls.popup, {[cls.isOpen]: isOpenCityPopup}, [])}>
                <Text size={16} as='p'>Ваш город {cityValue}?</Text>

                <HStack gap={10}>
                    <Button size={14} className={cls.cityYes} onClick={handleSelectCity}>Да</Button>
                    <Button size={14} className={cls.cityNo} variant='outline' onClick={onOpenCityModal}>Нет, другой</Button>
                </HStack>
            </VStack>
        </HStack>
    );
});


