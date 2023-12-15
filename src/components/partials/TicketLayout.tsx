interface TicketLayoutProps {
  children: React.ReactNode
  title: string
}

const TicketLayout: React.FC<TicketLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-100 w-3/4 flex-col overflow-hidden rounded-3xl shadow-lg">
      <div className="bg-blue-800 px-20 py-4 text-white">
        <div className="w-fit rounded-3xl bg-blue-300 px-15 py-2">{title}</div>
      </div>
      <div className="flex-1 bg-gray-300 px-20 py-8 text-lg text-gray-500">{children}</div>
    </div>
  )
}

export default TicketLayout
