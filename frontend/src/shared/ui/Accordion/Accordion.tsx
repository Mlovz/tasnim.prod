import cls from './Accordion.module.scss'
import {Disclosure, Transition} from "@headlessui/react";
import {FC, ReactNode} from "react";
import {Text} from "@/shared/ui";

interface AccordionProps{
    trigger: ReactNode;
    content?: string
}

const Accordion:FC<AccordionProps> = ({trigger, content}) => {
    return (
        <Disclosure as='div' className={cls.accordion} data-headlessui-state="open">
            {({ open, close }) => (
                /* Use the `open` state to conditionally change the direction of an icon. */
                <>

                    <Disclosure.Button
                        
                        className={cls.trigger}>

                        {trigger}
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

                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
};

export default Accordion;
