import { useTranslation } from 'react-i18next'

const Sorry = () => {
  const { t } = useTranslation()
  return (
    <div className="flex w-full animate-pulse flex-col items-center justify-center p-10">
      <span className="italic text-gray-500">{t('warning.sorry')}</span>
    </div>
  )
}

export default Sorry
