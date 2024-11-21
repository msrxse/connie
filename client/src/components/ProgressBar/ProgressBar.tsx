import styles from './Progressbar.module.css'

interface ProgressBarProps {
  progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
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
  )
}

export default ProgressBar
