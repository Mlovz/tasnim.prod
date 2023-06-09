import {StateSchema} from "@/app/providers";


export const getCityValue = (state: StateSchema) => state.city.city || null