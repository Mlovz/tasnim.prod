import React, {FC, FormHTMLAttributes, ReactNode} from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement>{
    children: ReactNode,
}
const Form:FC<FormProps> = ({children,  ...rest}) => {
    return (
        <form noValidate {...rest}>
            {children}
        </form>
    );
};

export default Form;
