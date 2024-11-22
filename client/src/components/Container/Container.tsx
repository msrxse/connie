import styles from './Container.module.css'

const Container = ({ type = 'main', children }) => {
  const itemClass = type === 'item' ? styles.item : ''

  return <div className={`${styles.container} ${itemClass}`}>{children}</div>
}

export default Container
