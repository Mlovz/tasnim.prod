import cls from './HomeProductsSection.module.scss'
import HomeHeaderSection from "@/pages/HomePage/ui/HomePage/HomeHeaderSection/HomeHeaderSection";
import {VStack} from "@/shared/ui";
import {useHomeProducts} from "@/pages/HomePage/api/getFetchHomeProductsApi";
import HomeProductsSectionBlock
    from "@/pages/HomePage/ui/HomePage/HomeProductsSection/HomeProductsSectionBlock/HomeProductsSectionBlock";

const HomeProductsSection = () => {
    const {data, isLoading} = useHomeProducts('')
    return (
        <VStack max gap={40}>
            <HomeHeaderSection
                subTitle='Каталог товаров'
                title='Популярные товары'
                btnText='Все товары'
                path='/products'
            />

            <HomeProductsSectionBlock products={data} isLoading={isLoading}/>
        </VStack>
    );
};

export default HomeProductsSection;
