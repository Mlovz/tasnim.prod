
export interface IStepsFormData {
    address:string
    count:number
    creditsAlimony:string
    date_of_birth:string
    files:{
        person_photo: File,
        passport_first_page: File,
        passport_second_page: File
    }
    first_name:string
    housing:string
    initial_fee:string
    last_name:string
    main_income:string
    manager_contacts:string
    marital_status:string
    middle_name:string
    monthlyPayment:number
    number_of_children:number
    organization_address:string
    other_income:string
    payment_of_loans_and_alimony:number
    phone:string
    place_of_work:string
    position:string
    price:number
    products:{
        product_name: string
        quantity: string
        price: string
    }
    rental_price:number
    seller:string
    tariff:string
    term:any
    total:number
    tradeMargin:number
    user_relatives:{
        name: string
        degree: string
        phone: string
    }
}

export interface StepProps {
    onNext?: () => void
    onBack?: () => void
    formData?: IStepsFormData | null
}

export interface InstallmentSchema {
    form: IStepsFormData | null
    isLoading: boolean
    error: string
}

export interface FetchCreateInstallment{
    data: any,
    title: string
    content: string
}