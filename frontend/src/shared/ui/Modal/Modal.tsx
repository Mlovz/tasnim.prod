import React, {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
} from 'react'
import { classNames } from '@/shared/lib'
import Portal from '../Portal/Portal'
import cls from './modal.module.scss'
import Spinner from '../Spinner/Spinner'
import {Icon} from "@/shared/ui";

export enum ModalSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
  size?: ModalSize
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, size = 'size_s', lazy } = props


  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    },
    [onClose]
  )

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
      document.body.style.cssText = 'overflow: hidden'
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.cssText = 'overflow: visible'
    }
  }, [isOpen, onKeyDown])

  const mods: Record<string, boolean | string | undefined> = {
    [cls.opened]: isOpen,
    [cls.size]: true,
  }

  if (lazy) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [className, 'app_modal'])}>
        <div
          className={classNames(cls.window, mods, [className])}
          onClick={onContentClick}
        >
          {onClose && (
            <div className={cls.close} onClick={onClose}>
              <Icon type="Close" />
            </div>
          )}

          <div className={cls.content}>
            <Suspense fallback={<Spinner className={cls.loader} />}>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </Portal>
  )
}
