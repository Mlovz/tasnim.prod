import cls from './SuccessCard.module.scss'
import {Icon, IconType, Modal, Text, VStack} from "@/shared/ui";
import {FC} from "react";

interface SuccessCardProps{
    isSuccess: boolean
    title: string,
    content: string
    onClose: () => void
}
const SuccessCard:FC<SuccessCardProps> = ({isSuccess, title, content, onClose}) => {
    return (
        <Modal isOpen={isSuccess} onClose={onClose}>
            <VStack align='center' gap={20}>
                <Icon type={IconType.SUCCESS} />
                <Text as='h2' size={22} className={cls.title} align='center'>{title}</Text>
                <Text as='p' size={16} align='center'>{content}</Text>
            </VStack>
        </Modal>
    );
};

export default SuccessCard;
