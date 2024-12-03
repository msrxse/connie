import { IconContext } from 'react-icons'

import styles from './Icons.module.css'

export const Icons = ({ children, color = 'black' }) => {
  return (
    <IconContext.Provider
      value={{
        color: color,
        size: '14px',
        className: styles.icons,
        style: {},
      }}
    >
      <span>{children}</span>
    </IconContext.Provider>
  )
}
