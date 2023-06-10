import cls from './HomeNewsSectionBlock.module.scss'
import {INewsCardItem} from "@/entities/News";
import {FC} from "react";
import {HStack, Skeleton} from "@/shared/ui";
import NewsCard from "@/entities/News/ui/NewsCard/NewsCard";

interface HomeNewsSectionBlockProps{
    isLoading: boolean,
    news: INewsCardItem[]
}
const HomeNewsSectionBlock:FC<HomeNewsSectionBlockProps> = ({isLoading, news}) => {

    if(isLoading){
      return(
          <HStack justify='between' wrap='wrap' gap={28} max>
              <Skeleton width={361} height={282} border={15}/>
              <Skeleton width={361} height={282} border={15}/>
              <Skeleton width={361} height={282} border={15}/>
              <Skeleton width={361} height={282} border={15}/>
              <Skeleton width={361} height={282} border={15}/>
              <Skeleton width={361} height={282} border={15}/>
          </HStack>
      )
    }

    return (
        <HStack wrap='wrap' justify='between' gap={28}>
            {
                news?.map((item) => (
                    <NewsCard key={item.id} item={item} variant='shadow' to={`/news/${item.id}`}/>
                ))
            }
        </HStack>

    );
};

export default HomeNewsSectionBlock;
