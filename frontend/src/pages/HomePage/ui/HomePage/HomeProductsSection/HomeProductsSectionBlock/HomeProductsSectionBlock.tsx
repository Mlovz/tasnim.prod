import cls from './HomeProductsSectionBlock.module.scss'
import {IProductItem, ProductCard} from "@/entities/ProductCard";
import {FC} from "react";
import {HStack, Skeleton, VStack} from "@/shared/ui";

interface HomeProductsSectionBlockProps{
    products: IProductItem[];
    isLoading: boolean
}

const HomeProductsSectionBlock:FC<HomeProductsSectionBlockProps> = ({products, isLoading}) => {

    if(isLoading){
        return (
            <HStack wrap='wrap' gap={28} justify='between'>
                {
                    [1,2,3,4,5,6,7,8].map((item) => (
                        <VStack gap={10} key={item}>
                            <Skeleton width={262} height={262} border={15}/>
                            <Skeleton width={100} height={20} border={10}/>
                            <Skeleton width={180} height={15} border={10}/>
                            <Skeleton width={50} height={15} border={10}/>
                            <HStack gap={24}>
                                <Skeleton width={130} height={48} border={10}/>
                                <Skeleton width={30} height={30} border={100}/>
                                <Skeleton width={30} height={30} border={100}/>
                            </HStack>
                        </VStack>
                    ))
                }
            </HStack>
        )
    }


    return (
        <HStack gap={28} wrap='wrap' justify='between'>
            {
                products?.map((product) => (
                    <ProductCard key={product._id}  product={product}/>
                ))
            }
        </HStack>
    );
};

export default HomeProductsSectionBlock;
