import cls from './Input.module.scss'
import {
    InputHTMLAttributes,
    memo,
    useState,
    forwardRef,
    ReactNode, ForwardedRef, FC,

} from "react";
import {classNames, Mods} from "@/shared/lib";
import {HStack} from "@/shared/ui";

type InputVariant = 'light' | 'blue'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?:string,
    type?: string,
    disabled?: boolean,
    placeholder: string,
    value: string,
    onChange?: (value: any) => void
    variant?: InputVariant,
    addonRight?: ReactNode,
    error?: any,
    required?:boolean,
}

const Input:FC<InputProps>  = memo(forwardRef((
    props, ref: ForwardedRef<HTMLInputElement>) => {

    const {
        className,
        type='text',
        disabled,
        value,
        placeholder,
        error,
        required= true,
        variant='light',
        addonRight,
        onChange,
        ...rest
    } = props

    const [typePass, setTypePass] = useState<boolean>(false)

    const mods: Mods = {
        [cls.active]: value,
        [cls.disabled]: disabled,
        [cls[variant]]: true
    }


    return (
        <div className={classNames(cls.field, mods, [className || ''])}>
            <label className={cls.label}>

                <div className={cls.placeholder}>
                    {placeholder}
                    {required && <span className={cls.danger}>*</span>}
                </div>

                <HStack className={cls.inputRow} max justify='between' align='center'>
                    <input
                        type={type === 'text' || typePass ? 'text' : 'password'}
                        value={value || ''}
                        autoComplete='off'
                        disabled={disabled}
                        required={required}
                        onChange={onChange}
                        ref={ref}
                        {...rest}
                    />
                    {addonRight && <div className={cls.addonIcon}>{addonRight}</div>}
                </HStack>
                {
                    type === 'password' && <svg
                        className={classNames(cls.eye)}
                        width="25"
                        height="20"
                        viewBox="0 0 25 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setTypePass(!typePass)}
                    >
                        <path
                            d="M0 9.99977C4.50584 -0.588463 20.4153 -0.588464 24.3529 9.99977C20.4153 20.588 4.50584 20.588 0 9.99977Z"
                            fill="#E6E6E6"
                        />
                        <circle
                            cx="12.1764"
                            cy="10.0001"
                            r="3.76471"
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                        />
                        {!typePass && (
                            <path
                                d="M3.17651 1L21.1765 19"
                                stroke="#E6E6E6"
                                strokeWidth="2"
                            />
                        )}
                    </svg>
                }
            </label>
            {
                error && <span className={cls.error}>{error?.message}</span>
            }
        </div>
    );
}));

export default Input;
