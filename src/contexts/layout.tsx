'use client'
import '../i18n'

import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'
import Navbar from '@/components/navigations/Navbar'
import Warning from '@/components/navigations/Warning'
import Footer from '@/components/navigations/Footer'

interface LayoutContextProps {
  // TODO: add later
  isMenuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  currentState: string
  onChangeState: (state: string) => void
}

export const LayoutContext = createContext<LayoutContextProps>({
  // TODO: add later
  isMenuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  currentState: 'homepage',
  onChangeState: () => {},
})

interface LayoutProviderProps {
  children: React.ReactNode
}

export const LayoutContextProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [state, setState] = useState('homepage')

  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  const onChangeState = (state: string) => {
    setState(state)
  }

  return (
    <LayoutContext.Provider
      value={{
        isMenuOpen,
        openMenu,
        closeMenu,
        currentState: state,
        onChangeState,
      }}>
      <Warning />
      <Navbar />
      <div className={cx('font-noto-sans h-screen transition-all duration-500 ease-in-out max-xl:hidden')}>
        <div className="flex h-full flex-col">
          <div className="relative flex h-56 w-full items-center justify-center">
            <img className="h-full w-full object-cover" src={'/banner-default.png'} alt="banner" />
            <div
              className={cx(
                'absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-all duration-500',
                isMenuOpen ? 'pt-0' : 'pt-10'
              )}>
              <h1 className="text-6xl text-white shadow-sm">{t('banner.default')}</h1>
            </div>
          </div>
          <div
            id="content"
            className={cx('w-full text-white transition-all duration-500', isMenuOpen && 'pb-6', 'overflow-auto')}>
            <div className="flex flex-col items-center justify-center gap-10 px-12 pb-16 pt-6">{children}</div>
          </div>
        </div>
        <Footer />
      </div>
    </LayoutContext.Provider>
  )
}
