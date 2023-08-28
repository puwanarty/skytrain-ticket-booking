import Button from '@/components/buttons/Button'
import { CheckSvg } from '@/components/svg'
import { Line, Station } from '@/types/dto'
import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SelectProps {
  label?: string
  placeholder?: string
  options: Line[]
  value?: Station
  onChange: (value: Station) => void
}

const Select: React.FC<SelectProps> = ({ label, placeholder, options, value, onChange }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)

  useEffect(() => {
    if (!value) return
    const selectedIdx = options.findIndex((item) => item.stations.some((station) => station.id === value.id))
    setSelectedIdx(selectedIdx)
  }, [value])

  return (
    <div>
      <button
        className="flex w-full items-center justify-between p-2 text-black"
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        disabled={options.length === 0}>
        <span
          className={cx({
            'italic text-gray-500	': !value,
          })}>
          {value ? `${value.name[language as 'th' | 'en']} (${value.alias || value.id})` : placeholder}
        </span>
      </button>
      <div
        className={cx(
          'fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-all duration-500',
          isOptionsOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOptionsOpen(false)}>
        <div
          className="flex h-3/5 w-3/5 flex-col gap-4 rounded-2xl border border-gray-500 bg-white p-8"
          onClick={(e) => e.stopPropagation()}>
          <span className="text-2xl text-gray-500">{label}</span>
          <div className="flex justify-evenly gap-4">
            {options.map((item, index) => {
              return (
                <Button
                  key={index}
                  // using inline style because tailwindcss doesn't support dynamic color
                  style={{
                    backgroundColor: item.color,
                  }}
                  className={cx({
                    'font-bold': selectedIdx === index,
                  })}
                  onClick={() => setSelectedIdx(index)}>
                  {item.name[language as 'th' | 'en']}
                </Button>
              )
            })}
          </div>
          <div className="grid grid-cols-3 overflow-y-scroll">
            {options[selectedIdx]?.stations.map((item, index) => (
              <div key={index} className="p-4 text-black">
                <button
                  key={index}
                  disabled={item.unavailable}
                  className={cx('w-full border-b border-gray-500 text-left hover:border-blue-500 disabled:opacity-50', {
                    'font-bold': item.id === value?.id,
                  })}
                  onClick={() => {
                    onChange(item)
                    setIsOptionsOpen(false)
                  }}>
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-1">{`${item.name[language as 'th' | 'en']} (${
                      item.alias || item.id
                    })`}</span>
                    <span
                      className={cx('text-xs text-gray-500', {
                        italic: item.unavailable,
                      })}>
                      {item.unavailable && t('home_page.booking.step.0.unavailable')}
                    </span>
                    {item.id === value?.id && <CheckSvg className="text-blue-800" />}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select
