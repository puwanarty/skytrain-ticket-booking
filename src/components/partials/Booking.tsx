import Button from '@/components/buttons/Button'
import Datepicker from '@/components/inputs/Datepicker'
import Select from '@/components/inputs/Select'
import FormControl from '@/components/partials/FormControl'
import TicketLayout from '@/components/partials/TicketLayout'
import { DataContext } from '@/contexts/data'
import { LayoutContext } from '@/contexts/layout'
import { Station } from '@/types/dto'
import { calculateNumberOfStationsBetweenStations, calculatePrice, uuid } from '@/utils/data'
import { formatDate } from '@/utils/date'
import cx from 'classnames'
import React from 'react'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowNarrowRightSvg,
  BrandMastercardSvg,
  BuildingBankSvg,
  CalendarSvg,
  CoinSvg,
  QrcodeSvg,
  ReloadSvg,
  SquareRoundedMinusSvg,
  SquareRoundedPlusSvg,
  TicketSvg,
  TrainSvg,
} from '@/components/svg'

interface BookingProps {}

const Booking: React.FC<BookingProps> = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { lines, stations, createTicket } = useContext(DataContext)
  const { onChangeState } = useContext(LayoutContext)

  const [from, setFrom] = useState<Station>()
  const [to, setTo] = useState<Station>()
  const [date, setDate] = useState(new Date().toISOString())
  const [amount, setAmount] = useState(1)
  const [payment, setPayment] = useState('')
  const [price, setPrice] = useState(0)
  const [id, setId] = useState('')

  const [step, setStep] = useState(1)

  const onSubmitStep = (s: number) => {
    if (s === 1) {
      if (from && to) {
        const numberOfStations = calculateNumberOfStationsBetweenStations(from.id, to.id)
        const price = calculatePrice(numberOfStations)
        setPrice(price)

        const id = uuid()
        setId(id)
      }
    }
    // step 3
    if (s === 3) {
      if (from && to) {
        const dto = {
          id,
          fromId: from.id,
          toId: to.id,
          date,
          amount,
          price,
          payment,
        }
        console.log(dto)
        createTicket(dto)
        onChangeState('home_page')
      }
    }

    // next step
    if (s < 3) setStep(s + 1)
  }

  const onSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const getIcon = (id: string) => {
    switch (id) {
      case 'promptpay':
        return <QrcodeSvg className="h-6 w-6 text-blue-800" />
      case 'creditcard':
        return <BrandMastercardSvg className="h-6 w-6 text-blue-800" />
      case 'banktransfer':
        return <BuildingBankSvg className="h-6 w-6 text-blue-800" />
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
              <button
                disabled={item > step - 1}
                onClick={() => setStep(item)}
                className={cx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-white transition-all duration-500',
                  item > step ? 'bg-gray-300' : 'bg-blue-500'
                )}>
                {item}
              </button>
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
      <TicketLayout title={t(`home_page.booking.step.${step - 1}.title`)}>
        {step === 1 && (
          <div className="flex h-full flex-1 flex-col gap-8">
            <div className="flex flex-1 gap-10">
              <div className="flex flex-1 flex-col justify-evenly gap-4">
                <div className="flex h-1/2 items-center gap-8">
                  <FormControl>
                    <span className="w-6">{t('home_page.booking.step.0.field.from.label')}</span>
                    <Select
                      placeholder={t('home_page.booking.step.0.field.from.placeholder')}
                      options={lines}
                      onChange={setFrom}
                      value={from}
                    />
                    <TrainSvg className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
                <div className="flex h-1/2 items-center gap-8">
                  <FormControl>
                    <span>{t('home_page.booking.step.0.field.date.label')}</span>
                    <Datepicker value={date} onChange={(date) => setDate(new Date(date).toISOString())} />
                    <CalendarSvg className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
              </div>
              <div className="flex w-10 flex-col items-center justify-evenly gap-4">
                <button onClick={() => onSwap()}>
                  <ReloadSvg className="h-6 w-6 text-blue-500 hover:animate-spin hover:text-blue-600" />
                </button>
                <div />
                <div />
              </div>
              <div className="flex flex-1 flex-col items-center justify-evenly gap-4">
                <div className="flex h-1/2 w-full items-center gap-8">
                  <FormControl>
                    <span className="w-6">{t('home_page.booking.step.0.field.to.label')}</span>
                    <Select
                      placeholder={t('home_page.booking.step.0.field.to.placeholder')}
                      options={lines}
                      onChange={setTo}
                      value={to}
                    />
                    <TrainSvg className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
                <div className="flex h-1/2 w-full items-center gap-8">
                  <FormControl>
                    <span>{t('home_page.booking.step.0.field.amount.label')}</span>
                    <button
                      onClick={() => {
                        if (amount > 1) {
                          setAmount(amount - 1)
                        }
                      }}>
                      <SquareRoundedMinusSvg className="h-6 w-6 text-blue-500 hover:text-blue-600" />
                    </button>
                    <span className="p-2 text-black">{amount}</span>
                    <button onClick={() => setAmount(amount + 1)}>
                      <SquareRoundedPlusSvg className="h-6 w-6 text-blue-500 hover:text-blue-600" />
                    </button>
                    <TicketSvg className="h-6 w-6 text-gray-500" />
                  </FormControl>
                </div>
              </div>
            </div>
            <Button disabled={!from || !to} onClick={() => onSubmitStep(1)}>
              {t('home_page.booking.step.0.submit')}
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex h-full flex-1 flex-col justify-center gap-8">
            <div className="flex flex-1 gap-8 text-lg">
              <div className="flex flex-1 flex-col items-center gap-2 font-bold">
                <span>{t('home_page.booking.step.1.field.payment_method.label')}</span>
                <div className="flex h-full w-full items-center justify-between gap-6">
                  <TrainSvg className="h-8 w-8 text-blue-800" />
                  <div className="grid flex-1 grid-rows-1">
                    <span className="text-center">{`${from?.name[language as 'th' | 'en']}`}</span>
                    <span className="text-center">{`(${from?.alias || from?.id})`}</span>
                  </div>
                  <ArrowNarrowRightSvg className="h-8 w-8 text-blue-800" />
                  <div className="grid flex-1 grid-rows-1">
                    <span className="text-center">{`${to?.name[language as 'th' | 'en']}`}</span>
                    <span className="text-center ">{`(${to?.alias || to?.id})`}</span>
                  </div>
                  <TrainSvg className="h-8 w-8 text-blue-800" />
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex items-center justify-center gap-2">
                    <CalendarSvg className="h-8 w-8 text-blue-800" />
                    <span className="line-clamp-1">{formatDate(date)}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <TicketSvg className="h-8 w-8 text-blue-800" />
                    <span className="line-clamp-1">{amount}</span>
                    <span>{t('home_page.booking.step.0.field.amount.unit')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CoinSvg className="h-8 w-8 text-blue-800" />
                    <span className="line-clamp-1">{price}</span>
                    <span>{t('home_page.booking.step.0.field.price.unit')}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center gap-2 font-bold">
                <span>{t('home_page.booking.step.1.field.payment_method.label')}</span>
                <div className="flex w-2/3 flex-col gap-2">
                  {['promptpay', 'creditcard', 'banktransfer'].map((item, index) => (
                    <button
                      key={index}
                      className="h-fit w-full rounded-full bg-white py-2 shadow-lg"
                      onClick={() => setPayment(item)}>
                      <div className="flex justify-center">
                        <div className="flex w-3/4 items-center">
                          <div className="w-1/5">{getIcon(item)}</div>
                          <span
                            className={cx(
                              'line-clamp-1 flex-1',
                              item === payment ? 'font-bold text-blue-800' : 'font-normal'
                            )}>
                            {t(`home_page.booking.step.1.field.payment_method.options.${item}`)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button disabled={payment === ''} onClick={() => onSubmitStep(2)}>
              {t('home_page.booking.step.1.submit')}
            </Button>
          </div>
        )}
        {step === 3 && (
          <div className="flex h-full flex-1 flex-col justify-center gap-8">
            <div className="flex flex-1 gap-8 text-lg">
              <div className="flex flex-1 flex-col items-center justify-evenly font-bold">
                <span>{t('home_page.booking.step.2.message.0')}</span>
                <span>{t('home_page.booking.step.2.message.1', { bookingId: id })}</span>
                <span>{t('home_page.booking.step.2.message.2')}</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-evenly font-bold">
                <img className="h-full rounded-lg object-cover" src={'/qr-code.png'} alt="qr-code" />
              </div>
            </div>
            <Button disabled={payment === ''} onClick={() => onSubmitStep(3)}>
              {t('home_page.booking.step.2.submit')}
            </Button>
          </div>
        )}
      </TicketLayout>
    </>
  )
}

export default Booking
