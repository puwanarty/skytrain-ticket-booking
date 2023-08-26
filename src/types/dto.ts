export type Station = {
  id: string
  name: string
}

export type Line = {
  id: string
  name: string
  stations: Station[]
}

export type Ticket = {
  id: string // kebab case, 18 chars, 3 groups, 6 chars each
  from: string // station id
  to: string // station id
  date: string // ISO 8601
  amount: number // baht rounded no decimal
  price: number // baht rounded no decimal
  payment: string // payment id
  status: string // enum: pending, paid, cancelled
  createAt: string // ISO 8601
}

export type History = {
  id: string
  ticketId: string
  oldStatus?: string
  newStatus: string
  createAt: string
  readAt?: string
}
