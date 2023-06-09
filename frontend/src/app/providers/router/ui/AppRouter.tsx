import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<h1>Loading</h1>}>{route.element}</Suspense>
        );

        if(route?.childrens?.length ){
            return (
                <Route key={route.childPath} path={route.childPath} element={route.childElement}>
                    {
                        route?.childrens?.map((item:any, index:any) => (
                            <Route key={item.path} path={item.path} element={
                                route.authOnly
                                    ? (
                                        <RequireAuth>{item.element}</RequireAuth>
                                    ) :
                                    item.element
                            }
                            />
                        ))
                    }
                </Route>
            )
        }


        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : element
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
