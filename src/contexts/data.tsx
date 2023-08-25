'use client'
import { Line, Station, Ticket } from '@/types/dto'
import { generateLines, generateTickets } from '@/utils/data'
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
})

interface DataProviderProps {
  children: React.ReactNode
}

export const DataContextProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [lines, setLines] = useState<Line[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])

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
    setTickets([...tickets, ticket])
  }

  const removeTicket = (ticket: Ticket) => {
    setTickets(tickets.filter((item) => item.id !== ticket.id))
  }

  const updateTicket = (ticket: Ticket) => {
    setTickets(tickets.map((item) => (item.id === ticket.id ? ticket : item)))
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
      }}>
      {children}
    </DataContext.Provider>
  )
}
