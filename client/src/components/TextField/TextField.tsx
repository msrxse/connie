import styles from './TextField.module.css'

interface TextProps {
  type?: 'text' | 'number' | 'email' | 'password'
  error?: boolean
  children: any
}

const TextField = ({ children, type, error }: TextProps) => {
  return (
    <div className={styles.textFieldWrapper}>
      <label>{children}</label>

      {error && <p className="error">TextField filed can't be empty!</p>}
    </div>
  )
}

export default TextField
