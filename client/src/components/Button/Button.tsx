import { BiChevronDown, BiChevronUp, BiDetail } from 'react-icons/bi'

import styles from './Button.module.css'

const Button = ({ onClick, index, children, isExpanded }) => {
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
