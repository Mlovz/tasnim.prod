import cls from './NewsPage.module.scss'
import {HStack, Text, VStack} from "@/shared/ui";
import NewsCard from "@/entities/News/ui/NewsCard/NewsCard";
import {useNewsHome} from "@/pages/HomePage/api/getFetchHomeNewsApi";

const NewsPage = () => {
    const {data}:any = useNewsHome('')


    return (
        <VStack gap={40}>
            <Text as='h1' size={50}>Новости</Text>

            <VStack gap={60}>
                <NewsCard item={data?.[0]} view='row' to={`/news/${data?.[0]?.id}`}/>

                <HStack wrap='wrap' className={cls.newsBlock}>
                    {data?.map((item:any) => (
                        <NewsCard key={item.id} item={item} to={`/news/${item.id}`}/>
                    ))}
                </HStack>
            </VStack>



        </VStack>
    );
};

export default NewsPage;
