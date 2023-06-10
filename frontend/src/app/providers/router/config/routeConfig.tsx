import {
    AppRoutes,
    getRouteInstallment,
    getRouteMain, getRouteNews, getRouteNewsDetail,
    getRoutePersonal,
    getRouteProfile, getRouteProfileFavorites,
    getRouteProfilePurchases, getRouteProfileReviews, getRouteReviews
} from "@/shared/conts/router";
import {AppRoutesProps} from "@/shared/types/router";
import {HomePage, ProfilePage, NotFoundPage, InstallmentPage, NewsPage, NewsDetailPage} from "@/pages";
import ProfileRoute from "@/pages/ProfilePage/ui/ProfileRoute/ProfileRoute";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <HomePage />,
    },
    [AppRoutes.PROFILE]: {
        authOnly: true,
        childPath: getRouteProfile(),
        childElement: <ProfileRoute/>,
        childrens: [
            {
                path: getRouteProfile(),
                element: <ProfilePage />,
            },
            {
                path: getRoutePersonal(),
                element: <h1>Personal</h1>
            },
            {
                path: getRouteProfilePurchases(),
                element: <h1>Покупки</h1>
            },
            {
                path: getRouteProfileFavorites(),
                element: <h1>Избранное</h1>
            },
            {
                path: getRouteProfileReviews(),
                element: <h1>Отзывы</h1>
            },
        ]
    },
    [AppRoutes.INSTALLMENT]: {
        path: getRouteInstallment(),
        element: <InstallmentPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />
    },
    [AppRoutes.NEWS]: {
        path: getRouteNews(),
        element: <NewsPage />
    },
    [AppRoutes.NEWS_DETAIL]: {
        path: getRouteNewsDetail(),
        element: <NewsDetailPage />
    }
}