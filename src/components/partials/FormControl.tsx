interface FormControlProps {
  children: React.ReactNode
}

const FormControl: React.FC<FormControlProps> = ({ children }) => (
  <div className="flex flex-1 items-center justify-between border-b border-gray-500 hover:border-blue-500">
    {children}
  </div>
)

export default FormControl
