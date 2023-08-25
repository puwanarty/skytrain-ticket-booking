import Button from '@/components/buttons/Button'
import Datepicker from '@/components/inputs/Datepicker'
import Select from '@/components/inputs/Select'
import TicketLayout from '@/components/partials/TicketLayout'
import { DataContext } from '@/contexts/data'
import { LayoutContext } from '@/contexts/layout'
import { Ticket } from '@/types/dto'
import { uuid } from '@/utils/data'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import { FaCalendarCheck } from '@react-icons/all-files/fa/FaCalendarCheck'
import { FaCcMastercard } from '@react-icons/all-files/fa/FaCcMastercard'
import { FaCcVisa } from '@react-icons/all-files/fa/FaCcVisa'
import { FaCoins } from '@react-icons/all-files/fa/FaCoins'
import { FaMinusCircle } from '@react-icons/all-files/fa/FaMinusCircle'
import { FaMoneyBillAlt } from '@react-icons/all-files/fa/FaMoneyBillAlt'
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle'
import { FaQrcode } from '@react-icons/all-files/fa/FaQrcode'
import { FaRedoAlt } from '@react-icons/all-files/fa/FaRedoAlt'
import { FaTrain } from '@react-icons/all-files/fa/FaTrain'
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt'
import cx from 'classnames'
import React from 'react'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const FormControl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-1 items-center justify-between border-b border-gray-500 hover:border-blue-500">
    {children}
  </div>
)

interface BookingProps {}

const Booking: React.FC<BookingProps> = () => {
  const { t } = useTranslation()
  const { getAllLine, getAllStation, addTicket } = useContext(DataContext)
  const { onChangeState } = useContext(LayoutContext)
  const lines = getAllLine()
  const stations = getAllStation()

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState(new Date().toISOString())
  const [amount, setAmount] = useState(1)
  const [payment, setPayment] = useState('')
  const [ticketId] = useState(uuid())

  const [step, setStep] = useState(1)

  const onSubmitStep = (s: number) => {
    if (s === 3) {
      const dto = {
        id: ticketId,
        from,
        to,
        date,
        amount,
        payment,
        price: amount * 50,
        status: 'paid',
        createAt: new Date().toISOString(),
      } as Ticket
      addTicket(dto)
      onChangeState('homepage')
    }
    setStep(s + 1)
  }

  const onSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const getIcon = (id: string) => {
    switch (id) {
      case 'promptpay':
        return <FaQrcode className="h-6 w-6 text-blue-800" />
      case 'creditcard':
        return (
          <div className="flex gap-2">
            <FaCcMastercard className="h-6 w-6 text-blue-800" />
            <FaCcVisa className="h-6 w-6 text-blue-800" />
          </div>
        )
      case 'banktransfer':
        return <FaMoneyBillAlt className="h-6 w-6 text-blue-800" />
      default:
        return <></>
    }
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-3/4 items-center justify-center">
          {[1, 2, 3].map((item) => (
            <React.Fragment key={item}>
              <div
                className={cx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-white transition-all duration-500',
                  item > step ? 'bg-gray-300' : 'bg-blue-500'
                )}>
                {item}
              </div>
              {item < 3 && (
                <div
                  className={cx(
                    'flex h-1 flex-1 transition-all duration-500',
                    item > step - 1 ? 'bg-gray-300' : 'bg-blue-500'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <TicketLayout title={t('booking.title')}>
        {step === 1 && (
          <div className="flex h-full flex-1 flex-col gap-8">
            <div className="flex flex-1 gap-10">
              <div className="flex flex-1 flex-col justify-evenly gap-4">
                <div className="flex h-1/2 items-center gap-8">
                  <FormControl>
                    <span className="w-6">{t('booking.from')}</span>
                    <Select
                      placeholder={t('booking.placeholder')}
                      options={lines}
                      onChange={(id) => setFrom(id)}
                      value={from}
                    />
                    <FaTrain className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
                <div className="flex h-1/2 items-center gap-8">
                  <FormControl>
                    <span>{t('booking.date')}</span>
                    <Datepicker value={date} onChange={(date) => setDate(new Date(date).toISOString())} />
                    <FaCalendarCheck className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
              </div>
              <div className="flex w-10 flex-col items-center justify-evenly gap-4">
                <button onClick={() => onSwap()}>
                  <FaRedoAlt className="h-6 w-6 text-blue-500 hover:animate-spin hover:text-blue-600" />
                </button>
                <div />
                <div />
              </div>
              <div className="flex flex-1 flex-col items-center justify-evenly gap-4">
                <div className="flex h-1/2 w-full items-center gap-8">
                  <FormControl>
                    <span className="w-6">{t('booking.to')}</span>
                    <Select
                      placeholder={t('booking.placeholder')}
                      options={lines}
                      onChange={(id) => setTo(id)}
                      value={to}
                    />
                    <FaTrain className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
                <div className="flex h-1/2 w-full items-center gap-8">
                  <FormControl>
                    <span>{t('booking.amount')}</span>
                    <button
                      onClick={() => {
                        if (amount > 1) {
                          setAmount(amount - 1)
                        }
                      }}>
                      <FaMinusCircle className="h-6 w-6 text-blue-500 hover:text-blue-600" />
                    </button>
                    <span className="p-2 text-black">{amount}</span>
                    <button onClick={() => setAmount(amount + 1)}>
                      <FaPlusCircle className="h-6 w-6 text-blue-500 hover:text-blue-600" />
                    </button>
                    <FaUserAlt className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
              </div>
            </div>
            <Button disabled={from === '' || to === ''} onClick={() => onSubmitStep(1)}>
              {t('booking.submit.1')}
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex h-full flex-1 flex-col justify-center gap-8">
            <div className="flex flex-1 gap-8 text-lg">
              <div className="flex flex-1 flex-col justify-evenly font-bold">
                <div className="flex items-center justify-between gap-6">
                  <FaTrain className="h-6 w-6 text-blue-800" />
                  <span className="text-center">{stations.find((item) => item.id === from)?.name}</span>
                  <FaArrowRight className="h-6 w-6 text-blue-800" />
                  <span className="text-center">{stations.find((item) => item.id === to)?.name}</span>
                  <FaTrain className="h-6 w-6 text-blue-800" />
                </div>
                <div className="flex items-center justify-between gap-6">
                  <FaCalendarCheck className="h-6 w-6 text-blue-800" />
                  <span>{new Date(date).toLocaleDateString()}</span>
                  <span className="w-10" />
                </div>
                <div className="flex items-center justify-between gap-6">
                  <FaUserAlt className="h-6 w-6 text-blue-800" />
                  <span>{amount}</span>
                  <span className="w-10 text-center">{t('booking.unit.person')}</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <FaCoins className="h-6 w-6 text-blue-800" />
                  <span>{amount * 50}</span>
                  <span className="w-10 text-center">{t('booking.unit.baht')}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-evenly gap-2 font-bold">
                <span>{t('booking.payment.title')}</span>
                {['promptpay', 'creditcard', 'banktransfer'].map((item, index) => (
                  <button
                    key={index}
                    className="h-10 w-3/4 rounded-full bg-white shadow-lg"
                    onClick={() => setPayment(item)}>
                    <div className="flex justify-center">
                      <div className="flex w-3/4">
                        <div className="w-1/5">{getIcon(item)}</div>
                        <span className={cx('flex-1', item === payment ? 'font-bold text-blue-800' : 'font-normal')}>
                          {t(`booking.payment.${item}`)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <Button disabled={payment === ''} onClick={() => onSubmitStep(2)}>
              {t('booking.submit.2')}
            </Button>
          </div>
        )}
        {step === 3 && (
          <div className="flex h-full flex-1 flex-col justify-center gap-8">
            <div className="flex flex-1 gap-8 text-lg">
              <div className="flex flex-1 flex-col items-center justify-evenly font-bold">
                <span>{t('booking.completed')}</span>
                <span>
                  {t('booking.bookingId')} {ticketId}
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-evenly font-bold">
                <img className="h-full rounded-lg object-cover" src={'/qr-code.png'} alt="qr-code" />
              </div>
            </div>
            <Button disabled={payment === ''} onClick={() => onSubmitStep(3)}>
              {t('booking.submit.3')}
            </Button>
          </div>
        )}
      </TicketLayout>
    </>
  )
}

export default Booking
