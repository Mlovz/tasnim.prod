import {
    getRoutePersonal,
    getRouteProfile,
    getRouteProfileFavorites,
    getRouteProfilePurchases, getRouteProfileReviews, getRouteReviews
} from "@/shared/conts/router";
import {IconType} from "@/shared/ui";

interface ProfileNavItem {
    path: string,
    content: string,
    icon: string
}


export const profileNavItems: ProfileNavItem[] = [
    {
        path: getRouteProfile(),
        content: 'Мой профиль',
        icon: IconType.SETTINGS
    },
    {
        path: getRoutePersonal(),
        content: 'Личные данные',
        icon: IconType.LIST
    },
    {
        path: getRouteProfilePurchases(),
        content: 'Покупки',
        icon: IconType.BAG
    },
    {
        path: getRouteProfileFavorites(),
        content: 'Избранное',
        icon: IconType.FAVORITE
    },
    {
        path: getRouteProfileReviews(),
        content: 'Отзывы',
        icon: IconType.COMMENT
    },
]