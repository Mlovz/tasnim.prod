import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {createReducerManager} from "./reducerManager";
import {StateSchema, ThunkExtra} from "./StateSchema";
import {cityReducer} from "@/features/City";
import {$api} from "@/shared/api/api";
import {authModalReducer} from "@/entities/AuthModal";
import {userReducer} from "@/entities/User";
import {successReducer} from "@/entities/SuccessCard";
import {profileReducer} from "@/entities/Profile";
import {rtkApi} from "@/shared/api/rtkApi";



export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        city: cityReducer,
        authModal: authModalReducer,
        user: userReducer,
        success: successReducer,
        profile: profileReducer,

        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const extraArg: ThunkExtra = {
        api: $api,
    }

    const store = configureStore({
        // @ts-ignore
        reducer: reducerManager.reduce as ReducersMapObject<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
                serializableCheck: false
            }).concat(rtkApi.middleware)
    })

    // @ts-ignore
    store.reducerManager = reducerManager
    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
export type RootState = ReturnType<typeof createReduxStore>['getState']