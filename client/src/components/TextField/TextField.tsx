import styles from './TextField.module.css'

interface TextProps {
  error?: boolean
  children: any
  title?: string
  type?: 'link'
}

const TextField = ({ children, title, type, error }: TextProps) => {
  return (
    <div className={`${styles.textFieldWrapper}`}>
      {title && <p className={styles.title}>{title}</p>}
      {type === 'link' ? <p className={styles.link}>{children}</p> : children}

      {error && <p className="error">TextField filled can't be empty!</p>}
    </div>
  )
}

export default TextField
