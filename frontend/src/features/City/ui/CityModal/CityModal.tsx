import React, {useCallback} from 'react';
import cls from './CityModal.module.scss'
import { Button, Icon, IconType, Input, Modal, Text, VStack} from "@/shared/ui";
import {useSelector} from "react-redux";
import {cityActions, getCityValue, getIsOpenCityModal, ICity} from "@/features/City";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {classNames} from "@/shared/lib";

const cityOptions: any = [
    {value: 'Nazran' },
    {value: 'Magas'},
    {value: 'Malgobek'},
    {value: 'Karabulak'}
]
export const CityModal = () => {
    const dispatch = useAppDispatch()
    const isOpenCityModal = useSelector(getIsOpenCityModal)
    const cityValue = useSelector(getCityValue)

    const onCloseCityModal = useCallback(() => {
        dispatch(cityActions.setToggleCityModal(false))
    },[])

    const handleSelectCity = useCallback((city:ICity) => {
        dispatch(cityActions.setSaveCity(city))
    },[])

    return (
        <Modal isOpen={isOpenCityModal} onClose={onCloseCityModal}>
                <VStack align='center' gap={28}>
                    <Text size={18} as='h2' className={cls.title}>Выберите свой город</Text>
                    <VStack gap={10} max>
                        <Input
                            value='Назрань'
                            placeholder='Введите свой населенный пункт'
                            addonRight={<Icon type={IconType.SEARCH}/>}
                        />
                        <Button variant='clear' className={cls.btnAuto}>Определить автоматически</Button>
                    </VStack>

                    <VStack gap={20} max>
                        {
                            cityOptions.map((item:any) => (
                                <button
                                    key={item.value}
                                    onClick={() => handleSelectCity(item.value)}
                                    className={classNames(cls.cityBtn, {[cls.active]: item.value === cityValue}, [])}
                                >
                                    {item.value}
                                </button>
                            ))
                        }
                    </VStack>

                </VStack>
        </Modal>
    );
};

