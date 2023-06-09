// Promise types
export interface PostFetchLoginByPhone{
    access_token: string
    user: any
    status?:string
}

export interface PostFetchRegisterByPhone{
    active_token?: string
    hash?: string
    otp: string
    phone?: string
    first_name?: string
    password?: string
    user?: any
}


// params types
export  interface LoginByPhoneParams{
    phone: string
    password: string
}

export interface RegisterByPhoneParams{
    phone: string
    first_name: string
    password: string
}

//schema types
export interface AuthSchema {
    isLoading: boolean,
    error: any,
    authFormData: PostFetchRegisterByPhone | null
    success: {
        title: string,
        content: string
    }
    type: 'register' | 'forgot'
}

