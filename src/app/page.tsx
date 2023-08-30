'use client'
import '../i18n'

import Booking from '@/components/partials/Booking'
import ContractUs from '@/components/partials/ContractUs'
import Faq from '@/components/partials/Faq'
import Homepage from '@/components/partials/Homepage'
import Inbox from '@/components/partials/Inbox'
import MyTicket from '@/components/partials/MyTicket'
import NotFound from '@/components/partials/NotFound'
import { LayoutContext } from '@/contexts/layout'
import { useContext } from 'react'

// CRITICAL: try to use single page application (SPA) instead of multi page application (MPA)

const App = () => {
  const { currentState } = useContext(LayoutContext)

  switch (currentState) {
    case 'home_page':
      return <Homepage />
    case 'map':
      return <NotFound type="under_construction" />
    case 'booking':
      return <Booking />
    case 'my_ticket':
      return <MyTicket />
    case 'inbox':
      return <Inbox />
    case 'contact_us':
      return <ContractUs />
    case 'faq':
      return <Faq />
    default:
      return <NotFound />
  }
}

export default App
