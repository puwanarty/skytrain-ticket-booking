import { Line, Station, Ticket } from '@/types/dto'
import { faker } from '@faker-js/faker'

export const uuid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return `${s4()}-${s4()}`.toUpperCase()
}

export const generateStations: (n: number) => Station[] = (n) => {
  let stations: Station[] = []
  for (let i = 0; i < n; i++) {
    stations.push({
      id: uuid(),
      name: faker.location.city(),
    })
  }
  return stations
}

export const generateLines: (n: number) => Line[] = (n) => {
  const lines = ['purple', 'blue', 'green', 'yellow']
  return lines.map((line) => ({
    id: uuid(),
    name: line,
    stations: generateStations(n),
  }))
}

export const generateTickets = (count: number, lines: Line[]) => {
  if (lines.length === 0) return []
  let data: Ticket[] = []
  const stations = lines.map((line) => line.stations).flat()
  for (let i = 0; i < count; i++) {
    data.push({
      id: uuid(),
      from: stations[
        faker.number.int({
          min: 0,
          max: stations.length - 1,
        })
      ].id,
      to: stations[
        faker.number.int({
          min: 0,
          max: stations.length - 1,
        })
      ].id,
      date: faker.date
        .recent({
          days: faker.number.int({ min: 1, max: 30 }),
        })
        .toISOString(),
      amount: faker.number.int({ min: 1, max: 5 }),
      price: faker.number.int({ min: 10, max: 50 }) * 10,
      payment: ['promptpay', 'creditcard', 'banktransfer'][faker.number.int({ min: 0, max: 2 })],
      status: ['pending', 'paid', 'cancelled'][faker.number.int({ min: 0, max: 2 })],
      createAt: faker.date
        .recent({
          days: faker.number.int({ min: 1, max: 30 }),
        })
        .toISOString(),
    })
  }
  return data
}
