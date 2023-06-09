import cls from './Accordion.module.scss'
import {Disclosure, Transition} from "@headlessui/react";
import {FC, ReactNode} from "react";
import {Icon, Text} from "@/shared/ui";
import {classNames} from "@/shared/lib";

interface AccordionProps{
    trigger: ReactNode;
    content?: string,
    icon?: string,
    items?: any
}

const Accordion:FC<AccordionProps> = ({trigger, content, icon, items}) => {
    return (
        <Disclosure as='div' className={cls.accordion} data-headlessui-state="open">
            {({ open, close }) => (
                /* Use the `open` state to conditionally change the direction of an icon. */
                <>

                    <Disclosure.Button
                        className={cls.trigger}>
                        {trigger}
                        {icon && <Icon type={icon} className={classNames(cls.icon, {[cls.iconIsOpen]: open}, [])}/>}
                    </Disclosure.Button>

                    <Transition
                        className={cls.transition}
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className={cls.menu} unmount as='div'>
                            {content && <Text as='p' >{content}</Text>}
                            {/*{*/}
                            {/*    items.map((item) => (*/}
                            {/*        */}
                            {/*    ))*/}
                            {/*}*/}
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
};

export default Accordion;
