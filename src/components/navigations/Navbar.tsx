import { LayoutContext } from '@/contexts/layout'
import { FaBars } from '@react-icons/all-files/fa/FaBars'
import { FaTicketAlt } from '@react-icons/all-files/fa/FaTicketAlt'
import cx from 'classnames'
import { useContext } from 'react'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { isMenuOpen, openMenu, onChangeState } = useContext(LayoutContext)

  return (
    <>
      <div
        className={cx(
          'fixed top-0 z-10 flex h-10 w-full items-center justify-between bg-white px-10 shadow-md transition-all duration-500',
          isMenuOpen && '-translate-y-10 opacity-0'
        )}>
        <button onClick={openMenu}>
          <FaBars className={cx('h-6 w-6 text-blue-800')} />
        </button>
        <button onClick={() => onChangeState('home_page')}>
          <FaTicketAlt className="h-8 w-8 text-blue-800 transition-all duration-200 hover:scale-125" />
        </button>
      </div>
    </>
  )
}

export default Navbar
