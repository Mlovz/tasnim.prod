

export type {SuccessSchema} from './model/types/success'
export  {getIsSuccess} from './model/selectors/getIsSuccess'
export  {getSuccessTitle} from './model/selectors/getSuccessTitle'
export  {getSuccessContent} from './model/selectors/getSuccessContent'
export  {successActions, successReducer} from './model/slice/successSlice'

export  {default as SuccessCard} from './ui/SuccessCard/SuccessCard'