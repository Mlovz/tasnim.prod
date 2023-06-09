import {StateSchema} from "@/app/providers";


export const getIsOpenCityModal = (state: StateSchema) => state.city.isOpenModal || false