interface WarningProps {}

export const Warning: React.FC<WarningProps> = () => {
  return (
    <div className="hidden max-xl:flex">
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center p-10">
        <span className="italic text-gray-500">No mobile version yet,</span>
        <span className="italic text-gray-500">please use web version</span>
      </div>
    </div>
  )
}

export default Warning
