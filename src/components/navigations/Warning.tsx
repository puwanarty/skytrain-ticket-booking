import { useTranslation } from 'react-i18next'

interface WarningProps {}

export const Warning: React.FC<WarningProps> = () => {
  const { t } = useTranslation()
  return (
    <div className="hidden max-xl:flex">
      <div className="flex h-screen w-full animate-pulse items-center justify-center p-10">
        <span className="italic text-gray-500">{t('warning.mobile')}</span>
      </div>
    </div>
  )
}

export default Warning
