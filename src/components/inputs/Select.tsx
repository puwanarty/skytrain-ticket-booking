import Button from '@/components/buttons/Button'
import { Line, Station } from '@/types/dto'
import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa6'

interface SelectProps {
  label?: string
  placeholder?: string
  options: Line[]
  value: string
  onChange: (id: string) => void
}

const Select: React.FC<SelectProps> = ({ label, placeholder, options, value, onChange }) => {
  const { t } = useTranslation()
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selected, setSelected] = useState(0)

  const [displayValue, setDisplayValue] = useState<Station | undefined>(undefined)

  useEffect(() => {
    const index = options.findIndex((item) => item.stations.some((station) => station.id === value))
    if (index > -1) {
      setSelected(index)
    }
  }, [value])

  useEffect(() => {
    const station = options.flatMap((item) => item.stations).find((item) => item.id === value)
    setDisplayValue(station)
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
          {value ? displayValue?.name : placeholder}
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
            {options.map((item, index) => (
              <Button
                key={index}
                className={cx({
                  'font-bold': selected === index,
                })}
                onClick={() => setSelected(index)}>
                {t(`misc.lines.${item.name}`)}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap justify-between overflow-auto">
            {options[selected]?.stations.map((item, index) => (
              <div key={index} className="w-1/3 p-4 text-black">
                <button
                  key={index}
                  className={cx('w-full border-b border-gray-500 text-left hover:border-blue-500', {
                    'font-bold': item.id === value,
                  })}
                  onClick={() => {
                    onChange(item.id)
                    setIsOptionsOpen(false)
                  }}>
                  <div className="flex justify-between">
                    <span className="line-clamp-1 w-full">{item.name}</span>
                    {item.id === value && <FaCheck className="h-6 w-6 text-blue-800" />}
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
