import NotFound from '@/components/partials/NotFound'
import { DataContext } from '@/contexts/data'
import cx from 'classnames'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface InboxProps {}

const Inbox: React.FC<InboxProps> = () => {
  const { t } = useTranslation()
  const { getOneTicket, getOneStation, getAllHistory, updateHistory } = useContext(DataContext)

  const histories = getAllHistory().sort((a, b) => {
    if (a.createAt < b.createAt) {
      return 1
    } else if (a.createAt > b.createAt) {
      return -1
    } else {
      return 0
    }
  })

  return (
    <div className="flex w-full flex-col gap-4">
      {histories.length > 0 ? (
        histories.map((item, index) => {
          const ticket = getOneTicket(item.ticketId)
          return (
            ticket && (
              <button
                key={index}
                className="flex justify-center"
                disabled={!!item.readAt}
                onClick={() => {
                  if (!item.readAt) {
                    updateHistory({
                      ...item,
                      readAt: new Date().toISOString(),
                    })
                  }
                }}>
                <div
                  key={index}
                  className={cx(
                    'flex w-2/3 justify-between overflow-hidden rounded-lg px-10 py-4 shadow-lg transition-all duration-500',
                    item.newStatus === 'paid'
                      ? 'bg-green-500'
                      : item.newStatus === 'cancelled'
                      ? 'bg-red-500'
                      : 'bg-yellow-500',
                    item.readAt ? 'opacity-50' : 'opacity-100'
                  )}>
                  <div className="flex items-center text-lg">
                    {t('inbox.message', {
                      from: getOneStation(ticket.from)?.name,
                      to: getOneStation(ticket.to)?.name,
                      action: t(`inbox.action.${item.newStatus}`),
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
