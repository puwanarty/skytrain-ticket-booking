import { MenuSvg, TicketSvg } from '@/components/svg'
import { LayoutContext } from '@/contexts/layout'
import cx from 'classnames'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()
  const { isMenuOpen, openMenu } = useContext(LayoutContext)

  return (
    <>
      <div
        className={cx(
          'fixed top-0 z-10 flex h-10 w-full items-center justify-between bg-white px-10 shadow-md transition-all duration-500',
          isMenuOpen && '-translate-y-10 opacity-0'
        )}>
        <button onClick={openMenu}>
          <MenuSvg className="h-8 w-8 text-blue-800" />
        </button>
        <div className="flex gap-2">
          {language === 'th' ? (
            <button onClick={() => changeLanguage('en')}>
              <img className="h-6 w-6 rounded-full" src="/uk-flag.gif" alt="uk" />
            </button>
          ) : (
            <button onClick={() => changeLanguage('th')}>
              <img className="h-6 w-6 rounded-full" src="/th-flag.gif" alt="th" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
