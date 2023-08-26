import { MapSvg, TicketSvg } from '@/components/svg'
import { LayoutContext } from '@/contexts/layout'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

const Homepage: React.FC = () => {
  const { t } = useTranslation()
  const { onChangeState } = useContext(LayoutContext)

  return (
    <div className="flex gap-8">
      {['maps', 'booking'].map((item, index) => (
        <div
          key={index}
          className="flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-200 hover:scale-110 "
          onClick={() => onChangeState(item)}>
          {item === 'maps' ? (
            <MapSvg className="h-24 w-24 text-blue-800" />
          ) : (
            <TicketSvg className="h-24 w-24 text-blue-800" />
          )}
          <p className="mt-4 text-center text-2xl text-gray-500">{t(`home_page.${item}.title`)}</p>
        </div>
      ))}
    </div>
  )
}

export default Homepage
