import React, {forwardRef, memo} from 'react'
import cls from './checkbox.module.scss'
import { classNames } from '@/shared/lib'

interface ICheckBoxProps {
  id: string
  name: string
  label: string
  checked: any
  disabled?: boolean
  className?: string
}

const CheckBox: React.FC<ICheckBoxProps> = memo(forwardRef(
    (
        { id, name, label, checked, className, disabled, ...rest },
        ref: React.Ref<HTMLInputElement>
    ) => {
      return (
          <label
              htmlFor={id}
              className={classNames(cls.checkBox, { [cls.disabled]: disabled }, [
                className || '',
              ])}
          >
            <div className={cls.input}>
              <input
                  type="checkbox"
                  name={name}
                  id={id}
                  checked={checked || false}
                  ref={ref}
                  {...rest}
              />
              <div className={cls.checked} />
            </div>
            <span>{label}</span>
          </label>
      )
    }
))

export default CheckBox
