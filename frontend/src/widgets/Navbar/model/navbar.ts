import {IconType} from "@/shared/ui";

export interface NavbarItem {
    path: string,
    text: string,
}

export interface NavbarBottomItem extends NavbarItem{
    iconType: IconType
}
export const navTopItems:NavbarItem[] = [
    {
        path: '',
        text: 'Компания'
    },
    {
        path: '/catalog',
        text: 'Каталог'
    },
    {
        path: '/services',
        text: 'Услуги'
    },
    {
        path: '/help',
        text: 'Помощь'
    },
    {
        path: '/contacts',
        text: 'Контакты'
    },
]


export const navBottomItems:NavbarBottomItem[] = [
    {
        path: '/profile/compare',
        text: 'Сравнить',
        iconType: IconType.COMPARISON
    },
    {
        path: '/profile/favorite',
        text: 'Избранное',
        iconType: IconType.FAVORITE
    },
    {
        path: '/cart',
        text: 'Корзина',
        iconType: IconType.CART
    },
]


export const navTopSubItems: NavbarItem[] = [
    {
        path: '/news',
        text: 'Новости'
    },
    {
        path: '/stock',
        text: 'Акции'
    },
    {
        path: '/partners',
        text: 'Партнеры'
    },
    {
        path: '/reviews',
        text: 'Отзывы'
    },
]