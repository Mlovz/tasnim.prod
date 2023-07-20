import cls from './NewsPage.module.scss'
import {HStack, Skeleton, Text, VStack} from "@/shared/ui";
import NewsCard from "@/entities/News/ui/NewsCard/NewsCard";
import {useNewsHome} from "@/pages/HomePage/api/getFetchHomeNewsApi";

const NewsPage = () => {
    const {data, isLoading}:any = useNewsHome('')

    // if(!data?.length) return <h1>Error</h1>

    if(isLoading){
        return (
            <HStack align='start' gap={32}>
                <Skeleton width={700} height={500} border={15} />
                <VStack gap={20}>
                    <Skeleton width={400} height={40} border={15}/>
                    <Skeleton width={300} height={40} border={15}/>
                    <Skeleton width={400} height={20} border={15}/>
                    <Skeleton width={400} height={20} border={15}/>
                    <Skeleton width={200} height={20} border={15}/>
                    <Skeleton width={200} height={20} border={15}/>
                </VStack>
            </HStack>
        )
    }


    return (
        <VStack gap={40}>
            <Text as='h1' size={50}>Новости</Text>

            <VStack gap={60}>
                <NewsCard item={data?.[0]} view='row' to={`/news/${data?.[0]?.id}`}/>

                <HStack wrap='wrap' className={cls.newsBlock}>
                    {data?.map((item:any) => (
                        <NewsCard key={item?.id} item={item} to={`/news/${item?.id}`}/>
                    ))}
                </HStack>
            </VStack>
        </VStack>
    );
};

export default NewsPage;
