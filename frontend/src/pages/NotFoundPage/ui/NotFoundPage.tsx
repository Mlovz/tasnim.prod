import React from 'react';
import cls from './NotFoundPage.module.scss'
import {AppImage} from "@/shared/ui/AppImage/AppImage";
import NotFoundImage from '@/shared/assets/notFound.png'
import {Button, Text, VStack} from "@/shared/ui";
const NotFoundPage = () => {
    return (
        <VStack gap={40} className={cls.notFount} align='center'>
            <AppImage src={NotFoundImage} alt='NotFoundImage'/>
            <VStack align='center' gap={10}>
                <Text as='h1' size={36}>Что-то пошло не так</Text>
                <Text as='p' size={16}>Страница не найдена. Возможно вы воспользовались недействительной ссылкой.</Text>
            </VStack>
            <Button path='/'>На главную</Button>
        </VStack>
    );
};

export default NotFoundPage;
