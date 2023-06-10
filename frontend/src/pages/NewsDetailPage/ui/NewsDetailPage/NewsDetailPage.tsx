import cls from './NewsDetailPage.module.scss'
import {useParams} from "react-router-dom";
import {useGetNewsById} from "@/pages/NewsDetailPage/api/getFetchNewsByIdApi";
import NewsDetailSkeleton from "@/pages/NewsDetailPage/ui/NewsDetailSkeleton/NewsDetailSkeleton";
import {HStack, Icon, IconType, Text, VStack} from "@/shared/ui";
import {AppImage} from "@/shared/ui/AppImage/AppImage";

const NewsDetailPage = () => {
    const params = useParams<{ id: string }>()
    const {data, isLoading} = useGetNewsById(params)

    if(isLoading){
        return (
            <NewsDetailSkeleton/>
        )
    }

    if(!data){
        return <Text as='h2' size={22} variant='success'>Статья не найдена</Text>
    }

    return (
        <VStack gap={40}>
            <VStack max gap={20}>
                <Text as='h1' size={50}>{data?.title}</Text>
                <HStack gap={40}>
                    <Text variant='success' as='span' size={12}>{data.createdAt}</Text>
                    <HStack gap={10}>
                        <Icon type={IconType.EYE}/>
                        <Text variant='success' as='span' size={12}>{data.number_of_post_views}</Text>
                    </HStack>
                </HStack>
            </VStack>

            <AppImage className={cls.detailImage} width='100%' height={527} src={data.image} alt='NewsImage'/>

            <Text>{data.content}</Text>
        </VStack>
    );
};

export default NewsDetailPage;
