'use client'
import '../i18n'

import Booking from '@/components/partials/Booking'
import Homepage from '@/components/partials/Homepage'
import Inbox from '@/components/partials/Inbox'
import MyBooking from '@/components/partials/MyBooking'
import Sorry from '@/components/partials/Sorry'
import { LayoutContext } from '@/contexts/layout'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

// CRITICAL: try to use single page application (SPA) instead of multi page application (MPA)

const App = () => {
  const { t } = useTranslation()

  const { currentState, onChangeState } = useContext(LayoutContext)

  switch (currentState) {
    case 'homepage':
      return <Homepage />
    case 'map':
      return <Sorry />
    case 'booking':
      return <Booking />
    case 'mybooking':
      return <MyBooking />
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
