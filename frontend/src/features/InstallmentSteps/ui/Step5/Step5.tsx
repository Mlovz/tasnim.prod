import cls from './Step5.module.scss'
import {Button, Form, HStack, Icon, IconType, Text, VStack} from "@/shared/ui";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {classNames} from "@/shared/lib";
import {
    getInstallmentIsLoading,
    StepProps
} from "@/features/InstallmentSteps";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {createInstallment} from "@/features/InstallmentSteps/model/services/installmentService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
const Step5:FC<StepProps> = ({onBack, formData}) => {
    const [files, setFiles] = useState<File | null | any>({
        person_photo: null,
        passport_first_page: null,
        passport_second_page: null,
    })

    const { person_photo, passport_first_page, passport_second_page } = files
    const isDisabled = !person_photo || !passport_first_page || !passport_second_page
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getInstallmentIsLoading)
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent, name: string) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        if (file && file.type.substring(0, 5) === 'image') {
            if (name === 'one') {
                setFiles({ ...files, person_photo: file })
            }
            if (name === 'two') {
                setFiles({ ...files, passport_first_page: file })
            }
            if (name === 'three') {
                setFiles({ ...files, passport_second_page: file })
            }
        } else {
            setFiles({ ...files })
        }
    }
    const onSubmit  = async(e: FormEvent) => {
        e.preventDefault()

        if(formData){
            const res = await dispatch(createInstallment({...formData, files}))
            if(res?.meta?.requestStatus === 'fulfilled'){
                navigate('/')
            }
        }
    }


    return (
        <Form className={cls.form} onSubmit={onSubmit}>
            <label
                htmlFor='person_photo'
                className={classNames(cls.item, {[cls.active]: person_photo},[])}>
                <input
                    type="file"
                    id="person_photo"
                    accept="image/*"
                    onChange={(e) => handleChange(e, 'one')}
                />
                {
                    person_photo ?
                        <HStack justify='between' >
                            <Text as='p' size={16} className={cls.active}>Свое фото прикреплено</Text>
                            <Text as='span' size={14} fw={500}>Изменить</Text>
                            <Icon type={IconType.CHECK} />
                        </HStack>
                        :
                        <HStack justify='between' className={cls.disabled}>
                            <Text as='p' className={cls.itemText}>
                                Прикрепить свое фото <span>*</span>
                            </Text>
                            <Icon type={IconType.PASSPORT_ONE} />
                        </HStack>
                }
            </label>
            <label
                htmlFor='passport_first_page'
                className={classNames(cls.item, {[cls.active]: passport_first_page},[])}>
                <input
                    type="file"
                    id="passport_first_page"
                    accept="image/*"
                    onChange={(e) => handleChange(e, 'two')}
                />
                {
                    passport_first_page ?
                        <HStack justify='between' className={cls.itemRow}>
                            <Text as='p' size={16} className={cls.active}>Фото первого разворота паспорта прикреплено</Text>
                            <Text as='span' size={14} fw={500}>Изменить</Text>
                            <Icon type={IconType.CHECK} />
                        </HStack>
                        :
                        <HStack justify='between' className={cls.disabled}>
                            <Text as='p' className={cls.itemText}>
                                Прикрепить фото первого разворота паспорта<span>*</span>
                            </Text>
                            <Icon type={IconType.PASSPORT_TWO} />
                        </HStack>
                }
            </label>
            <label
                htmlFor='passport_second_page'
                className={classNames(cls.item, {[cls.active]: passport_second_page},[])}>
                <input
                    type="file"
                    id="passport_second_page"
                    accept="image/*"
                    onChange={(e) => handleChange(e, 'three')}
                />
                {
                    passport_second_page ?
                        <HStack justify='between' className={cls.itemRow}>
                            <Text as='p' size={16} className={cls.active}>Фото разворота паспорта с пропиской прикреплено</Text>
                            <Text as='span' size={14} fw={500}>Изменить</Text>
                            <Icon type={IconType.CHECK} />
                        </HStack>
                        :
                        <HStack justify='between' className={cls.disabled}>
                            <Text as='p' className={cls.itemText}>
                                Прикрепить фото разворота паспорта с пропиской<span>*</span>
                            </Text>
                            <Icon type={IconType.PASSPORT_THREE} />
                        </HStack>
                }
            </label>

            <VStack gap={20} max>
                <Text as='p' size={12}>Нажимая на кнопку «Далее », Вы даете согласие на обработку персональных данных. Мы не передаем Ваши данные третьим лицам.</Text>
                <HStack gap={10}>
                    <Button variant='light' onClick={onBack}>Назад</Button>
                    <Button type='submit' disabled={isDisabled || isLoading} loading={isLoading}>Отправить</Button>
                </HStack>
            </VStack>
        </Form>
    );
};

export default Step5;