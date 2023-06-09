import cls from './HomePage.module.scss'
import Calculator from "@/pages/HomePage/ui/Calculator/Calculator";
import {VStack} from "@/shared/ui";
import {HomeFAQSection, HomeNewsSection, HomeProductsSection, HomeReviewsSection} from "./";

const HomePage = () => {
    return (
        <div className={cls.home}>
            <div className='container'>
                <VStack gap={80} max>
                    <Calculator/>

                    <HomeProductsSection/>

                    <HomeFAQSection/>

                    <HomeNewsSection/>

                    <HomeReviewsSection/>
                </VStack>
            </div>
        </div>
    );
};

export default HomePage;
