import cls from './NewsCard.module.scss'
import {FC, } from "react";
import {INewsCardItem} from "@/entities/News";
import {AppLink, HStack, Icon, IconType, Text, VStack} from "@/shared/ui";
import {AppImage} from "@/shared/ui/AppImage/AppImage";
import {classNames} from "@/shared/lib";

type NewsCardView = 'column' | 'row'
type NewsCardVariant = 'shadow'
interface NewsCardProps {
    view?: NewsCardView,
    variant?: NewsCardVariant,
    className?:string,
    item: INewsCardItem,
    to?: string
}

const viewClasses: Record<NewsCardView, string> = {
    'column': cls.column,
    'row': cls.row,
}

const variantClasses: Record<NewsCardVariant, string> = {
    'shadow': cls.shadow,
}

const NewsCard:FC<NewsCardProps> = ({view='column', variant, className, item, to=''}) => {
    const classes:any = [
        className,
        view && viewClasses[view],
        variant && variantClasses[variant]
    ]


    if(variant){
        return (
            <AppLink to={to}>
                <VStack gap={20} className={classNames(cls.newsCard, {}, classes)}>
                    <div className={cls.newsCardImage}>
                        <AppImage src={item?.image} alt='Картинка'/>
                    </div>

                    <VStack className={cls.content} gap={10}>
                        <Text as='span' size={12}>{item?.createdAt}</Text>
                        <Text as='h2' size={18}>{item?.title}</Text>
                    </VStack>
                </VStack>
            </AppLink>
        )

    }


    return (
        <AppLink to={to} className={classNames(cls.newsCard, {}, classes)}>
            <div className={cls.newsCardImage}>
                <AppImage src={item.image} alt='Картинка'/>
            </div>



            <VStack className={cls.content} gap={10}>
                <Text as='h2' size={22}>{item.title}</Text>
                <Text as='p' size={16}>{item.content}</Text>
                <HStack className={cls.newsCardfooter} gap={40}>
                    <Text as='span' size={12}>{item.createdAt}</Text>
                    <HStack gap={8}>
                        <Icon type={IconType.EYE}/>
                        <Text as='span' size={12}>{item.number_of_post_views}</Text>
                    </HStack>
                </HStack>
            </VStack>
        </AppLink>
    );
};

export default NewsCard;
