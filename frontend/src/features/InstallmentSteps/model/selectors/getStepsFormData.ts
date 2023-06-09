import {StateSchema} from "@/app/providers";

export const getStepsFormData = (state: StateSchema) => state.installment?.form || null