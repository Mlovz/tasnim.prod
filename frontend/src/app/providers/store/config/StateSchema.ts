import {
    AnyAction,
    CombinedState,
    ReducersMapObject,
    Reducer,
    EnhancedStore,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { NavigateOptions, To } from 'react-router-dom'
import {CitySchema} from "@/features/City";
import {AuthModalSchema} from "@/entities/AuthModal";
import {AuthSchema} from "@/features/Auth";
import {UserSchema} from "@/entities/User";
import {InstallmentSchema} from "@/features/InstallmentSteps";
import {SuccessSchema} from "@/entities/SuccessCard";
import {ProfileSchema} from "@/entities/Profile";
import {rtkApi} from "@/shared/api/rtkApi";

export interface StateSchema {
    city: CitySchema;
    authModal: AuthModalSchema;
    user: UserSchema;
    success: SuccessSchema;
    profile: ProfileSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    //async
    auth?: AuthSchema;
    installment?: InstallmentSchema;
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtra {
    api: AxiosInstance
    navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtra
    state: StateSchema;
}
