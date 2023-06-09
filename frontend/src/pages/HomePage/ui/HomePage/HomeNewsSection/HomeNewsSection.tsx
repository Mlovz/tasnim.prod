import cls from './HomeNewsSection.module.scss'
import HomeHeaderSection from "@/pages/HomePage/ui/HomePage/HomeHeaderSection/HomeHeaderSection";
import {VStack} from "@/shared/ui";
import {useNewsHome} from "@/pages/HomePage/api/getFetchHomeNewsApi";
import HomeNewsSectionBlock
    from "@/pages/HomePage/ui/HomePage/HomeNewsSection/HomeNewsSectionBlock/HomeNewsSectionBlock";

const HomeNewsSection = () => {
    const {data, isLoading}:any = useNewsHome('')


    return (
        <VStack max gap={40}>
            <HomeHeaderSection
                subTitle='Последные новости'
                title='Новости'
                btnText='Все новости'
                path='/news'
            />

         <HomeNewsSectionBlock news={data} isLoading={isLoading}/>
        </VStack>
    );
};

export default HomeNewsSection;
