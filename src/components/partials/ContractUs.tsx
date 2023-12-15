import Button from '@/components/buttons/Button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ContractUs = () => {
  const { t } = useTranslation()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSubmit = () => {
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="flex w-1/3 flex-col overflow-hidden rounded-lg bg-gray-300 text-gray-500">
      <h1 className="bg-blue-800 p-4 text-center text-white">{t('contact_us.title')}</h1>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-4">
          <span className="w-20 text-center">{t('contact_us.field.name.label')}</span>
          <input
            className="flex-1 rounded-lg p-2 px-4 outline-none"
            placeholder={t('contact_us.field.name.placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-center">{t('contact_us.field.email.label')}</span>
          <input
            className="flex-1 rounded-lg p-2 px-4 outline-none"
            placeholder={t('contact_us.field.email.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-center">{t('contact_us.field.message.label')}</span>
          <textarea
            className="flex-1 resize-none rounded-lg p-2 px-4 outline-none"
            placeholder={t('contact_us.field.message.placeholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span />
        </div>
        <Button disabled={!name || !email || !message} onClick={() => handleSubmit()}>
          {t('contact_us.submit')}
        </Button>
      </div>
    </div>
  )
}

export default ContractUs
