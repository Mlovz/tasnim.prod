import React from 'react';
import cls from './AuthSuccessCard.scss'
import {Icon, IconType, Text, VStack} from "@/shared/ui";
import {useSelector} from "react-redux";
import {getAuthSuccessData} from "@/features/Auth";
const AuthSuccessCard = () => {
    const successData = useSelector(getAuthSuccessData)
    return (
        <VStack gap={28} align='center'>
            <Icon type={IconType.SUCCESS}/>

            <VStack max gap={10} align='center'>
                <Text as='h2' size={22}>{successData?.title}</Text>
                <Text as='p' size={16} align='center'>{successData?.content}</Text>
            </VStack>
        </VStack>
    );
};

export default AuthSuccessCard;
