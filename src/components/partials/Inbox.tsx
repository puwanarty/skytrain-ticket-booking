import NotFound from '@/components/partials/NotFound'
import { DataContext } from '@/contexts/data'
import cx from 'classnames'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface InboxProps {}

const Inbox: React.FC<InboxProps> = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { stations, tickets, histories, updateHistory } = useContext(DataContext)

  const findOneTicket = (id: string) => tickets.find((item) => item.id === id)
  const findOneStation = (id: string) => stations.find((item) => item.id === id)

  return (
    <div className="flex w-full flex-col gap-4">
      {histories.length > 0 ? (
        histories.map((item, index) => {
          const ticket = findOneTicket(item.ticketId)
          return (
            ticket && (
              <button
                key={index}
                className="flex justify-center"
                disabled={!!item.readAt}
                onClick={() => {
                  if (!item.readAt) {
                    updateHistory(item.id)
                  }
                }}>
                <div
                  key={index}
                  className={cx(
                    'flex w-2/3 justify-between overflow-hidden rounded-lg px-10 py-4 shadow-lg transition-all duration-500',
                    item.status === 'paid'
                      ? 'bg-green-500'
                      : item.status === 'cancelled'
                      ? 'bg-red-500'
                      : 'bg-yellow-500',
                    item.readAt ? 'opacity-50' : 'opacity-100'
                  )}>
                  <div className="flex items-center text-lg">
                    {t('inbox.message', {
                      from: findOneStation(ticket.fromId)?.name[language as 'th' | 'en'],
                      to: findOneStation(ticket.toId)?.name[language as 'th' | 'en'],
                      action: t(`inbox.action.${item.status}`),
                    })}
                  </div>
                </div>
              </button>
            )
          )
        })
      ) : (
        <NotFound type="no_data" />
      )}
    </div>
  )
}

export default Inbox
