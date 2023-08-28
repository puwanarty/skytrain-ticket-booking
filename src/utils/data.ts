import raw from '@/constants/stations'

const interchanges = ['CEN', 'N2'] // define interchanges here
export const lines = raw
export const stations = raw.map((line) => line.stations).flat()

// create bidirectional connections from stations to calculate the shortest path
// https://www.geeksforgeeks.org/bidirectional-search/
const generateGraph = () => {
  let graph = new Map<string, string[]>()

  for (let i = 0; i < stations.length; i++) {
    graph.set(stations[i].id, [])
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const stations = line.stations

    for (let j = 0; j < stations.length; j++) {
      const station = stations[j]
      const stationId = station.id

      if (j > 0) {
        const previousStation = stations[j - 1]
        const previousStationId = previousStation.id

        if (!graph.get(stationId)?.includes(previousStationId)) {
          graph.set(stationId, [...(graph.get(stationId) || []), previousStationId])
        }

        if (!graph.get(previousStationId)?.includes(stationId)) {
          graph.set(previousStationId, [...(graph.get(previousStationId) || []), stationId])
        }
      }

      if (j < stations.length - 1) {
        const nextStation = stations[j + 1]
        const nextStationId = nextStation.id

        if (!graph.get(stationId)?.includes(nextStationId)) {
          graph.set(stationId, [...(graph.get(stationId) || []), nextStationId])
        }

        if (!graph.get(nextStationId)?.includes(stationId)) {
          graph.set(nextStationId, [...(graph.get(nextStationId) || []), stationId])
        }
      }
    }
  }

  return graph
}

// calculate the shortest path from the fromId to the toId with Dijkstra's Algorithm
// https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
const calculateShortestPath = (fromId: string, toId: string, graph: Map<string, string[]>) => {
  let queue: string[] = []
  let visited: string[] = []
  let previous: Map<string, string | null> = new Map()

  queue.push(fromId)
  visited.push(fromId)

  while (queue.length > 0) {
    const currentId = queue.shift()

    if (currentId === toId) {
      break
    }

    if (!currentId) {
      break
    }

    const neighbours = graph.get(currentId)

    if (neighbours) {
      for (let i = 0; i < neighbours.length; i++) {
        const neighbourId = neighbours[i]

        if (!visited.includes(neighbourId)) {
          visited.push(neighbourId)
          queue.push(neighbourId)
          previous.set(neighbourId, currentId)
        }
      }
    }
  }

  let path: string[] = []
  let currentId = toId

  while (currentId !== fromId) {
    path.push(currentId)
    currentId = previous.get(currentId) || ''
  }

  path.push(fromId)

  return path.reverse()
}

const simplifyPath = (path: string[]) => {
  let simplifiedPath: string[] = []

  path.forEach((stationId, index) => {
    if (index === 0 || index === path.length - 1 || interchanges.includes(stationId)) {
      simplifiedPath.push(stationId)
    }
  })

  return simplifiedPath
}

export const uuid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return `${s4()}-${s4()}`.toUpperCase()
}

export const calculateNumberOfStationsBetweenStations = (fromId: string, toId: string) => {
  const graph = generateGraph()
  const path = calculateShortestPath(fromId, toId, graph)

  const simplifiedPath = simplifyPath(path)

  console.log(fromId, toId)
  // log the path as an array of station ids
  console.log(path.join(' -> '))
  // log number of stations between the stations
  console.log(path.length - 1)
  // log number of interchanges between the stations
  console.log(path.filter((stationId) => interchanges.includes(stationId)).length)
  // log the simplified path as an array of station ids
  console.log(simplifiedPath.join(' -> '))

  return path.length - 1
}

export const calculatePrice = (numberOfStations: number) => {
  let price = 16

  if (numberOfStations < 15) {
    price += 4 * numberOfStations
  } else {
    price = 56
  }

  return price
}
