import { HomeSvg, InboxSvg, InfoCircleSvg, PhoneSvg, TicketSvg } from '@/components/svg'
import { DataContext } from '@/contexts/data'
import { LayoutContext } from '@/contexts/layout'
import cx from 'classnames'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { t } = useTranslation()
  const { isMenuOpen, closeMenu, onChangeState } = useContext(LayoutContext)
  const { histories } = useContext(DataContext)

  const getIcon = (path: string) => {
    switch (path) {
      case 'my_ticket':
        return <TicketSvg className="h-10 w-10" />
      case 'inbox':
        return <InboxSvg className="h-10 w-10" />
      case 'contact_us':
        return <PhoneSvg className="h-10 w-10" />
      case 'help_center':
        return <InfoCircleSvg className="h-10 w-10" />
      default:
        return <HomeSvg className="h-10 w-10" />
    }
  }

  return (
    <div
      className={cx(
        'fixed inset-0 z-20 bg-black bg-opacity-50 transition-all duration-500',
        isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={closeMenu}>
      <div
        className={cx(
          'fixed left-0 top-0 z-30 flex h-screen w-80 flex-col bg-blue-800 transition-all duration-500',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex h-full flex-col justify-center gap-14 px-10 py-6 text-white">
          {['home_page', 'my_ticket', 'inbox', 'contact_us', 'help_center'].map((item, index) => (
            <button
              key={index}
              className="transition-all duration-200 hover:scale-110"
              onClick={() => {
                closeMenu()
                onChangeState(item)
              }}>
              <div className="flex items-center gap-4">
                {getIcon(item)}
                <span className="text-xl">{t(`layout.sidebar.${item}`)}</span>
                {item === 'inbox' && histories.filter((ticket) => !ticket.readAt).length > 0 && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                    <span className="text-xs text-white">{histories.filter((ticket) => !ticket.readAt).length}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
