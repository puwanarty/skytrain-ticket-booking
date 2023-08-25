import { DataContext } from '@/contexts/data'
import { FaArrowsAltH } from '@react-icons/all-files/fa/FaArrowsAltH'
import { FaExclamation } from '@react-icons/all-files/fa/FaExclamation'
import cx from 'classnames'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

interface InboxProps {}

const Inbox: React.FC<InboxProps> = () => {
  const { t } = useTranslation()
  const { getAllTicket, getOneStation, updateTicket } = useContext(DataContext)

  const tickets = getAllTicket().sort((a, b) => {
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
      {tickets.map((item, index) => (
        <button
          key={index}
          className="flex justify-center"
          disabled={!!item.readAt}
          onClick={() => {
            if (!item.readAt) {
              updateTicket({
                ...item,
                readAt: new Date().toISOString(),
              })
            }
          }}>
          <div
            key={index}
            className={cx(
              'flex w-2/3 justify-between overflow-hidden rounded-lg bg-blue-500 px-10 py-4 shadow-lg transition-all duration-500'
            )}>
            <div className="flex items-center gap-2">
              <FaExclamation
                className={cx(
                  'h-4 w-4 text-red-500 transition-all duration-500',
                  item.readAt ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                )}
              />
              <div className="flex items-center gap-2 text-lg">
                <span>{getOneStation(item.from)?.name}</span>
                <FaArrowsAltH />
                <span>{getOneStation(item.to)?.name}</span>
              </div>
            </div>
            <span>
              <div
                className={cx(
                  'rounded-full px-2 py-1 text-gray-500',
                  item.status === 'paid' ? 'bg-green-200' : item.status === 'cancelled' ? 'bg-red-200' : 'bg-yellow-200'
                )}>
                {t(`inbox.status.${item.status}`)}
              </div>
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Inbox
