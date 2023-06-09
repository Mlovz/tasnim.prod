import React, {FC} from 'react';
import Otp from "react-otp-input";

interface OtpInputProps{
    numInputs: number,
    value: string,
    onChange: (value: any) => void
}
const OtpInput:FC<OtpInputProps> = ({numInputs, onChange, value}) => {
    return (
        <Otp
            containerStyle={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
            value={value}
            onChange={onChange}
            numInputs={numInputs}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 10px",
                fontSize: "2rem",
                borderBottom: "1px solid #B3B3B3"
            }}
        />
    );
};

export default OtpInput;
