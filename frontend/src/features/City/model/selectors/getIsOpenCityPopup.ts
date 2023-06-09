import {StateSchema} from "@/app/providers";


export const getIsOpenCityPopup = (state: StateSchema) => state.city.isOpenPopup || false