import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label,
  name,
  type = 'text',
  placeholder,
  error,
  className = '',
  onChange,
  onBlur,
  value,
  ...props
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        className={`block w-full rounded-md shadow-sm py-2 px-3 
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 
          'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
          sm:text-sm ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input