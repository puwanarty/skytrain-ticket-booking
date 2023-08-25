interface FormControlProps {
  label?: string
  children: React.ReactNode
}

const FormControl: React.FC<FormControlProps> = ({ label, children }) => (
  <div className="flex flex-1 flex-col text-xl">
    <span className="text-2xl">{label}</span>
    {children}
  </div>
)

export default FormControl
