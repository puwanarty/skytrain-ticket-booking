import { forwardRef, HTMLProps } from 'react'
import ReactDatePicker from 'react-datepicker'

interface DatepickerProps {
  value: string
  onChange: (value: string) => void
}

const CustomDatePicker = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(
  ({ value, disabled, onClick }, ref) => {
    return (
      <button className="h-full text-black" ref={ref} disabled={disabled} onClick={onClick}>
        <div className="flex items-center justify-between">{value}</div>
      </button>
    )
  }
)

CustomDatePicker.displayName = 'CustomDatePicker'

const Datepicker: React.FC<DatepickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex justify-center p-2">
      <ReactDatePicker
        customInput={<CustomDatePicker />}
        selected={new Date(value)}
        minDate={new Date()}
        onChange={(date) => {
          if (date) {
            onChange(date.toISOString().split('T')[0])
          }
        }}
      />
    </div>
  )
}

export default Datepicker
