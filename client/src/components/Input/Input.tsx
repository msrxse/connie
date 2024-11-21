import { ChangeEvent } from 'react'

import styles from './Input.module.css'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  isTextArea?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  isTextArea,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={label}>{label}</label>
      <>
        {isTextArea ? (
          <textarea name="Text1" value={value} cols={30} rows={5} disabled={disabled} />
        ) : (
          <input
            type={type}
            id={label}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </>
      {error && <p className="error">Input filed can't be empty!</p>}
    </div>
  )
}

export default Input
