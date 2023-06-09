import cls from './HomeHeaderSection.module.scss'
import {Button, HStack, Icon, IconType, Text, VStack} from "@/shared/ui";
import {FC} from "react";


interface HomeHeaderSectionProps{
    subTitle: string;
    title: string
    btnText: string;
    path: string
}

const HomeHeaderSection:FC<HomeHeaderSectionProps> = ({subTitle, title, btnText, path}) => {
    return (
        <HStack justify='between' max align='end' className={cls.header}>
            <VStack>
                <Text size={12} as='span'>{subTitle}</Text>
                <Text size={36} as='h2'>{title}</Text>
            </VStack>

            {
                path &&  <Button
                    path={path}
                    variant='clear'
                    addonRight={<Icon type={IconType.ARROW_LEFT}/>}
                >
                    {btnText}
                </Button>
            }

        </HStack>
    );
};

export default HomeHeaderSection;
