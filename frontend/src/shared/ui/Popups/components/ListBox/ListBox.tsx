import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import {  Icon, IconType, Text, TextSize, TextWeight} from "@/shared/ui";
import {classNames} from "@/shared/lib";

export interface ListBoxItem<T extends string> {
    value: string | number;
    content: ReactNode;
    disabled?: boolean;
}

type ListBtnVariant = 'clear' | 'input'
interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
    max?:boolean,
    variant?: ListBtnVariant,
    size?: TextSize,
    fw?: TextWeight
    menuClass?: string,
    error?: string
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly=false,
        direction = 'bottom right',
        label,
        max=false,
        variant='input',
        size,
        fw,
        menuClass,
        error
    } = props;

    const variantClasses:Record<ListBtnVariant, string> = {
        'clear': cls.clear,
        'input': cls.input,
    }

    const optionsClasses = [mapDirectionClass[direction], popupCls.menu, menuClass];

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    return (
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={(e:any) => onChange(e)}
            >
                {({open}) => (
                    <>
                        <HListBox.Button className={classNames(cls.btn, {}, [variantClasses[variant]])}>
                            <Text as='span' size={size} fw={fw}>
                                {selectedItem?.content || variant !== 'input' && defaultValue}
                                {variant === 'input' && <div
                                    className={classNames(cls.label, {[cls.isActive]: selectedItem?.content? true : false}, [])}>
                                    {defaultValue}
                                    <span className={cls.danger}>*</span>
                                </div>}
                            </Text>
                            <Icon className={`${open && cls.rotate}`} type={IconType.ARROW_DOWN} />
                        </HListBox.Button>
                        {error && <Text as='span' size={12} className={popupCls.error}>{error}</Text>}
                        <HListBox.Options
                            className={classNames(cls.options, {[cls.max]:max}, optionsClasses)}
                        >
                            {items?.map((item) => (
                                <HListBox.Option
                                    key={item.value}
                                    value={item.value}
                                    disabled={item.disabled}
                                    as={Fragment}
                                >
                                    {({ active, selected }) => (
                                        <li
                                            className={classNames(cls.item, {
                                                [popupCls.active]: active,
                                                [popupCls.disabled]: item.disabled,
                                                [popupCls.selected]: selected,
                                            })}
                                        >
                                            {selected}
                                            {item.content}
                                        </li>
                                    )}
                                </HListBox.Option>
                            ))}
                        </HListBox.Options>
                    </>
                )}
            </HListBox>
    );
}
