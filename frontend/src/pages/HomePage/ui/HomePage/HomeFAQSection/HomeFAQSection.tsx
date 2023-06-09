import cls from './HomeFAQSection.module.scss'
import {Accordion, Text, VStack} from "@/shared/ui";
import HomeHeaderSection from "../HomeHeaderSection/HomeHeaderSection";
const HomeFAQSection = () => {
    return (
        <VStack max gap={40}>
            <HomeHeaderSection
                subTitle='Вопросы и ответы'
                title='Частые вопросы'
                btnText='Все вопросы'
                path='/faq'
            />

            <VStack max >
                {
                    [1,2,3,4,5].map((item) => (
                        <Accordion
                            trigger={
                                <Text as='p' size={18} variant='success'>Обязательна ли государственная работа для оформления рассрочки в вашей компании?</Text>
                            }
                            content='В том, что мы не выдаем кредит а оформляем рассрочку на конкретный товар. В договорах нашей компании отсутствуют такие элементы как штрафы, страховки, пени, комиссии, сборы, платы за погашение, а так же возможная продажа в будущем долгов коллекторским службам. Четкие, ясные понятные условия всех заключаемых компанией «ЛяРиба-Финанс» договоров является принципиальным отличием от классических кредитов традиционных банков. Посмотрите видео Мурада Алискерова "В чем все таки разница ?"'
                        />
                    ))
                }

            </VStack>
        </VStack>
    );
};

export default HomeFAQSection;
