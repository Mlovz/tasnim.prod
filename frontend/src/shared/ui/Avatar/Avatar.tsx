import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage/AppImage';
import { Skeleton } from '../Skeleton/Skeleton';
import {classNames, Mods} from "@/shared/lib";
import Icon from "@/shared/ui/Icon/Icon";
import {IconType} from "@/shared/ui/Icon/IconTypes";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    const fallback = <Skeleton width={size} height={size} border={50} />;
    // const errorFallback = <Icon type={IconType.BAG} />;

    // <Icon width={size} height={size} Svg={UserIcon} />


    return (
        <AppImage
            fallback={fallback}
            // errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
