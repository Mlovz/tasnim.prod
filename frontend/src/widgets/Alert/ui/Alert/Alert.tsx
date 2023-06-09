import {useSelector} from "react-redux";
import {getIsSuccess, getSuccessContent, getSuccessTitle, successActions, SuccessCard} from "@/entities/SuccessCard";
import {useCallback} from "react";
import {useAppDispatch} from "@/shared/hooks/useStore";


const Alert = () => {
    const isSuccess = useSelector(getIsSuccess)
    const successTitle = useSelector(getSuccessTitle)
    const successContent = useSelector(getSuccessContent)
    const dispatch = useAppDispatch()

    const onCloseSuccessCard = useCallback(() => {
        dispatch(successActions.setSuccessClear())
    },[dispatch])

    if(isSuccess){
        return (
            <SuccessCard
                isSuccess={isSuccess}
                title={successTitle}
                content={successContent}
                onClose={onCloseSuccessCard}
            />
        );
    }


    return (
        <div>

        </div>
    );
};

export default Alert;
