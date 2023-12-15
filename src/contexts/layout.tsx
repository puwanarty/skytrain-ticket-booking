'use client'
import '../i18n'
import Footer from '@/components/navigations/Footer'
import Navbar from '@/components/navigations/Navbar'
import NotSupported from '@/components/navigations/NotSupported'
import Sidebar from '@/components/navigations/Sidebar'
import cx from 'classnames'
import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  currentState: 'home_page',
  onChangeState: () => {},
})

interface LayoutProviderProps {
  children: React.ReactNode
}

export const LayoutContextProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [state, setState] = useState('home_page')

  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  const onChangeState = (state: string) => {
    setState(state)
  }

  const getBannerText = () => {
    switch (state) {
      case 'my_ticket':
        return 'my_ticket'
      case 'inbox':
        return 'inbox'
      case 'contact_us':
        return 'contact_us'
      case 'faq':
        return 'faq'
      default:
        return 'home_page'
    }
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
      <NotSupported />
      <Navbar />
      <Sidebar />
      <div className={cx('font-noto-sans h-screen transition-all duration-500 ease-in-out max-xl:hidden')}>
        <div className="flex h-full flex-col">
          <div className="relative flex h-56 w-full items-center justify-center">
            <img className="h-full w-full object-cover" src={'/banner-default.png'} alt="banner" />
            <div
              className={cx(
                'absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-all duration-500',
                isMenuOpen ? 'pt-0' : 'pt-10'
              )}>
              <h1 className="text-6xl text-white shadow-sm">{t(`layout.sidebar.${getBannerText()}`)}</h1>
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
