export const getIntlPriceFormat = (price: any) => {
    return new Intl.NumberFormat('ru-RU', {currency: 'rub',style: 'currency'}).format(price)
}