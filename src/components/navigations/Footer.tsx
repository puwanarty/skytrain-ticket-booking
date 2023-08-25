'use client'
import { LayoutContext } from '@/contexts/layout'
import { FaCopyright } from '@react-icons/all-files/fa/FaCopyright'
import cx from 'classnames'
import { useContext } from 'react'

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const { isMenuOpen } = useContext(LayoutContext)
  return (
    <div
      className={cx(
        'fixed bottom-0 z-10 flex h-10 w-full items-center justify-end bg-gray-200 px-10 text-xs italic text-gray-500 transition-all duration-500',
        isMenuOpen && 'translate-y-10 opacity-0'
      )}>
      <FaCopyright />
      <span className="ml-2">2023 - All Rights Reserved</span>
    </div>
  )
}

export default Footer
