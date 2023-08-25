'use client'
import '../i18n'
import Booking from '@/components/partials/Booking'
import Inbox from '@/components/partials/Inbox'
import Sorry from '@/components/partials/Sorry'
import { LayoutContext } from '@/contexts/layout'
import { FaMap } from '@react-icons/all-files/fa/FaMap'
import { FaTicketAlt } from '@react-icons/all-files/fa/FaTicketAlt'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

// CRITICAL: try to use single page application (SPA) instead of multi page application (MPA)

const App = () => {
  const { t } = useTranslation()

  const { currentState, onChangeState } = useContext(LayoutContext)

  switch (currentState) {
    case 'homepage':
      return (
        <div className="flex gap-8">
          {['map', 'booking'].map((item, index) => (
            <div
              key={index}
              className="flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-200 hover:scale-110 "
              onClick={() => {
                onChangeState(item)
              }}>
              {item === 'map' ? (
                <FaMap className="h-24 w-24 text-blue-800" />
              ) : (
                <FaTicketAlt className="h-24 w-24 text-blue-800" />
              )}
              <p className="mt-4 text-center text-2xl text-gray-500">{t(`homepage.${item}`)}</p>
            </div>
          ))}
        </div>
      )
    case 'map':
      return <Sorry />
    case 'booking':
      return <Booking />
    case 'mybooking':
      return <Sorry />
    case 'inbox':
      return <Inbox />
    case 'contactus':
      return <Sorry />
    case 'helpcenter':
      return <Sorry />
    default:
      return <Sorry />
  }
}

export default App
