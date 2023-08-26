'use client'
import { History, Line, Station, Ticket } from '@/types/dto'
import { generateLines, generateTickets, uuid } from '@/utils/data'
import { createContext, useEffect, useState } from 'react'

interface DataContextProps {
  getAllLine: () => Line[]
  getOneStation: (id: string) => Station | undefined
  getAllStation: () => Station[]
  getOneTicket: (id: string) => Ticket | undefined
  getAllTicket: () => Ticket[]
  addTicket: (ticket: Ticket) => void
  removeTicket: (ticket: Ticket) => void
  updateTicket: (ticket: Ticket) => void
  getAllHistory: () => History[]
  updateHistory: (history: History) => void
}

export const DataContext = createContext<DataContextProps>({
  getAllLine: () => [],
  getOneStation: () => undefined,
  getAllStation: () => [],
  getOneTicket: () => undefined,
  getAllTicket: () => [],
  addTicket: () => {},
  removeTicket: () => {},
  updateTicket: () => {},
  getAllHistory: () => [],
  updateHistory: () => {},
})

interface DataProviderProps {
  children: React.ReactNode
}

export const DataContextProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [lines, setLines] = useState<Line[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [histories, setHistories] = useState<History[]>([])

  const getAllLine = () => {
    return lines
  }

  const getAllStation = () => {
    return lines.map((item) => item.stations).flat()
  }

  const getOneStation = (id: string) => {
    return getAllStation().find((item) => item.id === id)
  }

  const getOneTicket = (id: string) => {
    return tickets.find((item) => item.id === id)
  }
  const getAllTicket = () => {
    return tickets
  }

  const addTicket = (ticket: Ticket) => {
    const history = {
      id: uuid(),
      ticketId: ticket.id,
      oldStatus: '',
      newStatus: ticket.status,
      createAt: new Date().toISOString(),
    } as History

    setHistories([...histories, history])
    setTickets([...tickets, ticket])
  }

  const removeTicket = (ticket: Ticket) => {
    setTickets(tickets.filter((item) => item.id !== ticket.id))
  }

  const updateTicket = (ticket: Ticket) => {
    const target = tickets.find((item) => item.id === ticket.id)

    if (target && target.status !== ticket.status) {
      const history = {
        id: uuid(),
        ticketId: ticket.id,
        oldStatus: target.status,
        newStatus: ticket.status,
        createAt: new Date().toISOString(),
      } as History
      setHistories([...histories, history])
    }

    setTickets(tickets.map((item) => (item.id === ticket.id ? ticket : item)))
  }

  const getAllHistory = () => {
    return histories
  }

  const updateHistory = (history: History) => {
    setHistories(histories.map((item) => (item.id === history.id ? history : item)))
  }

  useEffect(() => {
    setLines(generateLines(24))
  }, [])

  useEffect(() => {
    setTickets(generateTickets(24, lines))
  }, [lines])

  return (
    <DataContext.Provider
      value={{
        getAllLine,
        getOneStation,
        getAllStation,
        getOneTicket,
        getAllTicket,
        addTicket,
        removeTicket,
        updateTicket,
        getAllHistory,
        updateHistory,
      }}>
      {children}
    </DataContext.Provider>
  )
}
