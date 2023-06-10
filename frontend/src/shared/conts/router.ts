export enum AppRoutes {
    MAIN = 'main',
    INSTALLMENT = 'installment',
    NOT_FOUND = 'not_found',
    PROFILE = 'profile',
    NEWS = 'news',
    NEWS_DETAIL = 'news_detail',
}

// export const AppRouteByPath: Record<AppRoutes, string> = {
//     [AppRoutes.MAIN]: '/',
//     [AppRoutes.INSTALLMENT]: '/',
//     [AppRoutes.PROFILE]: '/',
//     [AppRoutes.MAIN]: '/',
// }
export const getRouteMain = () => '/'
export const getRouteInstallment = () => '/installment'
export const getRouteCart = () => '/cart'
export const getRouteProfile = () => '/profile'
export const getRoutePersonal = () => '/profile/personal'
export const getRouteProfilePurchases = () => '/profile/purchases'
export const getRouteProfileFavorites = () => '/profile/favorites'
export const getRouteProfileReviews = () => '/profile/reviews'

export const getRouteNews = () => '/news'
export const getRouteNewsDetail = () => '/news/:id'
export const getRouteStock = () => '/stock'
export const getRoutePartners = () => '/partners'
export const getRouteReviews = () => '/reviews'