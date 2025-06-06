import { DropdownDirection } from '@/shared/types/ui';
import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'bottom center': cls.optionsBottomCenter,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,
    'top center': cls.optionsTopCenter,
};
