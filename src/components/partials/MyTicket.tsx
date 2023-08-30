import NotFound from '@/components/partials/NotFound'
import { ArrowNarrowRightSvg } from '@/components/svg'
import { DataContext } from '@/contexts/data'
import { Ticket } from '@/types/dto'
import { formatDate, isExpired } from '@/utils/date'
import cx from 'classnames'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TicketDetailProps {
  ticket?: Ticket
  isFull?: boolean
  onClose: () => void
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, isFull, onClose }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { findStation, updateTicket } = useContext(DataContext)

  return (
    ticket && (
      <>
        <div
          className={cx('flex w-full items-center text-center justify-center bg-blue-800 p-4', isFull ? 'text-lg' : 'text-base')}>
          <span className="line-clamp-1 flex-1">{findStation(ticket.fromId)?.name[language as 'th' | 'en']}</span>
          <ArrowNarrowRightSvg className="mx-2" />
          <span className="line-clamp-1 flex-1">{findStation(ticket.toId)?.name[language as 'th' | 'en']}</span>
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
            <span>{t('my_ticket.message.3') + ' ' + formatDate(ticket.date)}</span>
          </div>
          {isFull && (
            <div className="flex flex-col items-center justify-center gap-2 p-2 text-gray-500">
              <img src="/qr-code.png" className="h-32 w-32" alt="qr-code" />
              <div className="flex gap-2">
                {ticket.status === 'pending' && (
                  <button
                    className="rounded-full bg-green-500 px-2 text-sm text-white"
                    onClick={() => {
                      updateTicket(ticket.id, {
                        status: 'paid',
                      })
                      onClose()
                    }}>
                    {t('my_ticket.test.button.paid')}
                  </button>
                )}
                {ticket.status === 'pending' && (
                  <button
                    className="rounded-full bg-gray-500 px-2 text-sm text-white"
                    onClick={() => {
                      updateTicket(ticket.id, {
                        status: 'cancelled',
                      })
                      onClose()
                    }}>
                    {t('my_ticket.test.button.cancelled')}
                  </button>
                )}
              </div>
              {ticket.status === 'pending' && (
                <span className="text-xs text-gray-400">{t('my_ticket.test.label')}</span>
              )}
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
          <span>{`ราคา ${ticket.price * ticket.amount} บาท`}</span>
        </div>
      </>
    )
  )
}

const MyTicket = () => {
  const { tickets } = useContext(DataContext)
  const [isOpen, setIsOpen] = useState(false)
  const [ticket, setTicket] = useState<Ticket>()

  const onOpen = (id: string) => {
    const ticket = tickets.find((item) => item.id === id)
    setTicket(ticket)
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return tickets.length > 0 ? (
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
          <TicketDetail ticket={ticket} isFull onClose={onClose} />
        </div>
      </div>
      <div className="grid w-3/4 grid-cols-4 items-center justify-center gap-4">
        {tickets.map((item, index) => (
          <button
            key={index}
            disabled={isExpired(new Date(item.date))}
            onClick={() => onOpen(item.id)}
            className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-300 shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50">
            <TicketDetail ticket={item} onClose={onClose} />
          </button>
        ))}
      </div>
    </React.Fragment>
  ) : (
    <NotFound type="no_data" />
  )
}

export default MyTicket
