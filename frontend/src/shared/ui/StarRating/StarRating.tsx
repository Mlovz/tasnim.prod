import {FC, memo, useState} from "react";
import cls from './StarRating.module.scss'

interface StarRatingProps{
    rating?: number
    setRating?: (value: number) => void
}
const StarRating:FC<StarRatingProps> = memo(({rating=0, setRating}) => {
    const [hover, setHover] = useState(0);


    return (
        <div className={cls.starRating}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? cls.on : cls.off}
                        onClick={() => setRating?.(index)}
                        onMouseEnter={() => {
                            if(setRating) {
                                setHover(index)
                            }
                        }}
                        onMouseLeave={() =>{
                            if(setRating) {
                                setHover(rating)}
                            }
                        }
                    >
                        <span className={cls.star}>&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
});

export default StarRating