import cls from './ProductCard.module.scss'
import {IProductItem} from "@/entities/ProductCard";
import {FC, useState} from "react";
import {AppImage} from "@/shared/ui/AppImage/AppImage";
import {Button, HStack, Icon, IconType, Text, VStack} from "@/shared/ui";
import {getIntlPriceFormat} from "@/shared/helpers/getIntlPriceFormat";
import {classNames} from "@/shared/lib";
import StarRating from "@/shared/ui/StarRating/StarRating";

interface ProductCardProps{
    product: IProductItem;
}
type Status = 'new' | 'promotion'

const productStatus: Record<Status, string> = {
    'new': 'Новинка',
    'promotion': 'Акция',
}

const productStatusClasses: Record<Status, any> = {
    new: cls.new,
    promotion: cls.promotion,
}

const ProductCard:FC<ProductCardProps>= ({product}) => {
    const [idx, setIdx] = useState<number>(0)


    const onMouseEnter = (index:number) => {
        setIdx(index)
    }

    const onMouseLeave = (index:number) => {
        setIdx(index)
    }

    return (
        <VStack
            gap={28}
            className={cls.productCard}

        >
            <VStack gap={10}>
                <div className={cls.image}>
                    <AppImage src={product.images[idx].url} alt='Product Image'/>
                    <div className={cls.imageHover}>
                        {
                            product.images.map((item, index) => (
                                <div
                                    onMouseEnter={() => onMouseEnter(index)}
                                    onMouseLeave={() => onMouseLeave(index)}
                                ></div>
                            ))
                        }
                    </div>
                    <div className={cls.imageDots}>
                        {
                            product.images.map((item, index) => (
                                <div className={classNames(cls.imageDotsItem, {[cls.active]: idx === index}, [])}></div>
                            ))
                        }
                    </div>

                    <div className={classNames(cls.discount, {}, [productStatusClasses[product?.status]])}>
                        {productStatus[product.status]}
                    </div>

                </div>

                <HStack gap={14} align='end'>
                    <Text as='h2' size={22}>{getIntlPriceFormat(product.price)}</Text>
                    <Text as='h2' size={16} fw={700} className={cls.oldPrice}>{getIntlPriceFormat(product.oldPrice)}</Text>
                </HStack>

                <Text as='p' size={16}>{product.content}</Text>

                <HStack gap={10}>
                    <StarRating rating={product.rating}/>
                    <Text as='span' size={16}>{product?.reviews?.length || 12}</Text>
                </HStack>
            </VStack>

            <HStack gap={20}>
                <Button>В корзину</Button>
                <Icon type={IconType.FAVORITE}/>
                <Icon type={IconType.COMPARISON}/>
            </HStack>

        </VStack>
    );
};

export default ProductCard;
