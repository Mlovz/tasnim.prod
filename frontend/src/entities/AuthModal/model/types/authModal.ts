
export enum AuthModalViewType{
    LOGIN = 'login',
    REGISTER = 'register',
    OTP = 'otp',
    FORGOT = 'forgot',
    SUCCESS = 'success',
    RESET = 'reset'
}

export interface AuthModalSchema {
    isOpen: boolean,
    view: AuthModalViewType
}