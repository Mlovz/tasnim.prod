import { CSSProperties, memo } from 'react';
import cls from './Skeleton.module.scss';
import {classNames} from "@/shared/lib";

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: number;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, height, width, border } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
});
