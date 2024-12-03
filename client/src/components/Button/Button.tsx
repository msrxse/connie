import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import styles from './Button.module.css'

interface ButtonProps {
  onClick: any
  index: number
  children: any
  isDroor?: boolean
  isExpanded?: boolean
}

const Button = ({ onClick, index, children, isDroor, isExpanded }: ButtonProps) => {
  if (!isDroor) {
    return (
      <button onClick={() => onClick(index)}>
        <div className={styles.handler}>
          <strong>{children}</strong>
        </div>
      </button>
    )
  }
  return (
    <button onClick={() => onClick(index)}>
      {!isExpanded ? (
        <div className={styles.handler}>
          <BiChevronDown size={18} style={{ marginBottom: '-2px' }} />
          <strong>{children}</strong>
        </div>
      ) : (
        <div className={styles.handler}>
          <BiChevronUp size={18} style={{ marginBottom: '-2px' }} />
          <strong>{children}</strong>
        </div>
      )}
    </button>
  )
}

export default Button
