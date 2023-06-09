import { FC } from 'react'
import { classNames } from '@/shared/lib'
import cls from './spinner.module.scss'

export enum SpinnerColor {
  WHITE = 'White',
}

interface SpinnerProps {
  className?: string
  color?: SpinnerColor | any
}

const Spinner: FC<SpinnerProps> = ({ className, color }) => {
  const mods: Record<string, boolean> = {
    [cls[color]]: true,
  }
  return (
    <div className={classNames(cls.lds_ellipsis, mods, [className || ''])}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
