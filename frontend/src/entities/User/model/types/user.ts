

export interface IUser{
    address:string
    address_correspondence:string
    avatar:string
    bik:string
    cart:[]
    checking_score:string
    compare:[]
    correspondent_score:string
    createdAt:string
    date_of_birth:string
    email:string
    favorites:[]
    first_name:string
    gender:string
    inn:string
    kpp:string
    last_name:string
    legal_address:string
    legal_name:string
    middle_name:string
    nick_name:string
    ogrn:string
    password:string
    payees_bank:string
    phone:string
    purchases:[]
    reviews:[]
    role:string
    updatedAt: string
    __v?: number
    _id:string
}

export interface UserSchema {
    authData: IUser | null,
    token: string
    isLoading: boolean
}