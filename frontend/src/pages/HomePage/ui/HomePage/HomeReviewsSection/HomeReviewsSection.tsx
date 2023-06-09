import {VStack} from "@/shared/ui";
import HomeHeaderSection from "@/pages/HomePage/ui/HomePage/HomeHeaderSection/HomeHeaderSection";

const HomeReviewsSection = () => {
    return (
        <VStack max gap={40}>
            <HomeHeaderSection
                subTitle='Наши клиенты'
                title='Отзывы'
                btnText='Все отзывы'
                path='/reviews'
            />
        </VStack>
    );
};

export default HomeReviewsSection;
