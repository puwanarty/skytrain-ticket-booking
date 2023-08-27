import { differenceInDays } from 'date-fns'

export const isExpired = (date: Date) => {
  const now = new Date()
  return differenceInDays(now, date) > 0
}
