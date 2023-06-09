import React, {FC} from 'react';
import cls from './ForgotPasswordForm.module.scss'
import ForgotPasswordCurrentForm from "./ForgotPasswordCurrentForm/ForgotPasswordCurrentForm";
import ForgotNewPasswordForm from "./ForgotNewPasswordForm/ForgotNewPasswordForm";

export interface ForgotPasswordFormProps{
    onOpenLogin: () => void
}
const ForgotPasswordForm:FC<ForgotPasswordFormProps> = ({onOpenLogin}) => {
    const time = true
    return (
        <div className={cls.forgot}>

            <ForgotPasswordCurrentForm onOpenLogin={onOpenLogin}/>


        </div>
    );
};

export default ForgotPasswordForm;
