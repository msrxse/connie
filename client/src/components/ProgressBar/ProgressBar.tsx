import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  title?: string
  progress: number
}

const ProgressBar = ({ title, progress }: ProgressBarProps) => {
  return (
    <div className={styles.main}>
      {title && <div className={styles.label}>{title}</div>}
      <div className={styles.progressbar}>
        <div
          className={styles.progressInner}
          style={{
            width: `${progress}%`,
          }}
        >
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
