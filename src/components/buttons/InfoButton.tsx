import { ArrowNarrowRightSvg, InfoCircleSvg } from '@/components/svg'
import { calculateNumberOfStationsBetweenStations, isInterchange } from '@/utils/data'
import cx from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface InfoButtonProps {
  fromId?: string
  toId?: string
}

const InfoButton: React.FC<InfoButtonProps> = ({ fromId = '', toId = '' }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { path } = calculateNumberOfStationsBetweenStations(fromId, toId)

  let simplifiedPath = [] as string[]

  let stationCount = 0
  for (let i = 0; i < path.length; i++) {
    if (i === 0 || i === path.length - 1 || isInterchange(path[i])) {
      if (stationCount > 0) simplifiedPath.push(`n${stationCount}`)
      stationCount = 0
      simplifiedPath.push(path[i])
    } else {
      stationCount++
    }
  }

  return (
    fromId &&
    toId && (
      <>
        <button onClick={() => setIsOpen(true)}>
          <div className="flex justify-center text-xs font-normal text-gray-500">
            <span>{t('home_page.booking.step.1.info.button')}</span>
            <InfoCircleSvg className="ml-1 inline-block h-4 w-4 text-gray-500" />
          </div>
        </button>
        <div
          className={cx(
            'fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-all duration-500',
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          onClick={() => setIsOpen(false)}>
          <div
            className="flex flex-col gap-8 rounded-2xl border border-gray-500 bg-white p-8"
            onClick={(e) => e.stopPropagation()}>
            <span>{t('home_page.booking.step.1.info.title')}</span>
            <div className="flex gap-4">
              {simplifiedPath.map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-4">
                  <>
                    {item.startsWith('n') ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                        {item.replace('n', '')}
                      </span>
                    ) : (
                      <span
                        className={cx(
                          'flex h-10 w-10 items-center justify-center rounded-full text-white',
                          isInterchange(item) ? 'bg-green-500' : 'bg-blue-800'
                        )}>
                        {item}
                      </span>
                    )}
                    {index < simplifiedPath.length - 1 && <ArrowNarrowRightSvg className="h-8 w-8 text-blue-800" />}
                  </>
                </div>
              ))}
            </div>
            {
              // info about each circle color
            }
            <div className="flex flex-col text-xs font-normal">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-800" /> {t('home_page.booking.step.1.info.blue')}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" /> {t('home_page.booking.step.1.info.green')}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-500" /> {t('home_page.booking.step.1.info.gray')}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default InfoButton
