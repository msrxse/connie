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
          <strong>{children}</strong>
          <BiChevronDown />
        </div>
      ) : (
        <div className={styles.handler}>
          <strong>{children}</strong>
          <BiChevronUp />
        </div>
      )}
    </button>
  )
}

export default Button
