import { ButtonHTMLAttributes, forwardRef } from 'react'
import cx from 'classnames'

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(
          'w-full rounded-full bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 disabled:opacity-50',
          className
        )}
        {...props}>
        {children}
      </button>
    )
  }
)

export default Button
