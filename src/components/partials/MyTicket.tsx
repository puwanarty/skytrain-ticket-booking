import { DataContext } from '@/contexts/data'
import { Ticket } from '@/types/dto'
import { FaLongArrowAltRight } from '@react-icons/all-files/fa/FaLongArrowAltRight'
import cx from 'classnames'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const TicketDetail: React.FC<{ ticket?: Ticket; isFull?: boolean }> = ({ ticket, isFull }) => {
  const { t } = useTranslation()
  const { getOneStation } = useContext(DataContext)

  return (
    ticket && (
      <>
        <div
          className={cx('flex w-full items-center justify-center bg-blue-800 p-4', isFull ? 'text-lg' : 'text-base')}>
          <span className="line-clamp-1">{getOneStation(ticket.from)?.name}</span>
          <FaLongArrowAltRight className="mx-2" />
          <span className="line-clamp-1">{getOneStation(ticket.to)?.name}</span>
        </div>
        <div className={cx('flex w-full', isFull ? 'justify-evenly' : 'justify-center')}>
          <div className="flex flex-col items-center justify-center gap-2 p-2 text-gray-500">
            {isFull && (
              <span>
                {t('my_ticket.message.0', {
                  ticketId: ticket.id,
                })}
              </span>
            )}
            <span>
              {t('my_ticket.message.1', {
                amount: ticket.amount,
              })}
            </span>
            {isFull && (
              <span>
                {t('my_ticket.message.2', {
                  paymentMethod: t(`home_page.booking.step.1.field.payment_method.options.${ticket.payment}`),
                })}
              </span>
            )}
            <span>{t('my_ticket.message.3') + new Date(ticket.date).toLocaleDateString()}</span>
          </div>
          {isFull && (
            <div className="flex flex-col items-center justify-center gap-2 p-2 text-gray-500">
              <img src="/qr-code.png" className="h-32 w-32" />
            </div>
          )}
        </div>
        <div className={cx('flex w-full items-center justify-between bg-blue-800 p-2', isFull ? 'text-sm' : 'text-xs')}>
          <span
            className={cx(
              'rounded-full px-2',
              ticket.status === 'pending' ? 'bg-yellow-500' : ticket.status === 'paid' ? 'bg-green-500' : 'bg-gray-500'
            )}>
            {t(`misc.status.${ticket.status}`)}
          </span>
          <span>{`ราคา ${ticket.price} บาท`}</span>
        </div>
      </>
    )
  )
}

const MyTicket = () => {
  const { getAllTicket } = useContext(DataContext)
  const [isOpen, setIsOpen] = useState(false)
  const [ticket, setTicket] = useState<Ticket>()

  const tickets = getAllTicket().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const onOpen = (id: string) => {
    const ticket = tickets.find((item) => item.id === id)
    setTicket(ticket)
    setIsOpen(true)
  }

  return (
    <React.Fragment>
      <div
        className={cx(
          'fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-lg shadow-lg transition-all duration-500',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}>
        <div
          className="flex w-2/5 flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-300 shadow-lg"
          onClick={(e) => e.stopPropagation()}>
          <TicketDetail ticket={ticket} isFull />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center justify-center gap-4">
        {tickets.map((item, index) => (
          <button
            key={index}
            onClick={() => onOpen(item.id)}
            className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-300 shadow-lg transition-all duration-200 hover:scale-105">
            <TicketDetail ticket={item} />
          </button>
        ))}
      </div>
    </React.Fragment>
  )
}

export default MyTicket
