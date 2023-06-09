import {Controller} from "react-hook-form";
import ReactInputMask from 'react-input-mask'
import React, {FC, ReactNode} from "react";

interface InputPhoneProps{
    value:string,
    control: any,
    required?: boolean,
    name: string,
    trigger:ReactNode,
    mask: string,
    maskPlaceholder: string,
}
const InputMask:FC<InputPhoneProps> = (
    {
        value,
        control,
        required,
        name,
        trigger,
        mask,
        maskPlaceholder
    }) => {

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: required,
            }}
            render={({ field }) => (
                <ReactInputMask
                    mask={mask}
                    maskPlaceholder={maskPlaceholder}
                    value={value}
                    onChange={field.onChange}
                >
                    {trigger}
                </ReactInputMask>
            )}
        />
    );
};

export default InputMask;
