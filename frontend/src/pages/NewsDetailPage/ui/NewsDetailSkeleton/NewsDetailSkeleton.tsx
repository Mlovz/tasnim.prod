import React from 'react';
import {HStack, Skeleton, VStack} from "@/shared/ui";

const NewsDetailSkeleton = () => {
    return (
        <VStack gap={40}>
                <VStack max gap={10}>
                    <Skeleton width='90%' height={40} border={10}/>
                    <Skeleton width='50%' height={40} border={10}/>

                    <HStack gap={20}>
                        <Skeleton width={100} height={20} border={10}/>
                        <Skeleton width={50} height={20} border={10}/>
                    </HStack>
                </VStack>

            <Skeleton width='100%' height={500} border={10}/>

            <VStack gap={14} max>
                <Skeleton width='100%' height={20} border={10}/>
                <Skeleton width='89%' height={20} border={10}/>
                <Skeleton width='77%' height={20} border={10}/>
                <Skeleton width='65%' height={20} border={10}/>
                <Skeleton width='52%' height={20} border={10}/>
            </VStack>

        </VStack>
    );
};

export default NewsDetailSkeleton;
