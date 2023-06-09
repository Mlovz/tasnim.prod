import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {JSX, useMemo} from 'react';
import {getRouteMain} from "@/shared/conts/router";
import {getUserToken} from "@/entities/User";
// import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
// import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
    children: JSX.Element
    roles?: any;
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const isLogged = !!useSelector(getUserToken);
    const location = useLocation();
    const token = !!localStorage.getItem('token')
    // const userRoles = useSelector(getUserRoles);

    // const hasRequiredRoles = useMemo(() => {
    //     if (!roles) {
    //         return true;
    //     }
    //
    //     return roles.some((requiredRole) => {
    //         const hasRole = userRoles?.includes(requiredRole);
    //         return hasRole;
    //     });
    // }, [roles, userRoles]);

    if (!isLogged && !token) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }
    //
    // if (!hasRequiredRoles) {
    //     return (
    //         <Navigate
    //             to={getRouteForbidden()}
    //             state={{ from: location }}
    //             replace
    //         />
    //     );
    // }

    return children;
}
