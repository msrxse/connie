import styles from './EmptyDisplay.module.css'

const EmptyDisplay = () => {
  return (
    <div className={styles.emptyDisplay}>
      <div className={styles.innerDiv}>
        <ul>
          <li>Hello</li>
          <li>To get started select a material group from above</li>
          <li>From the scatter plot chart that appears:</li>
        </ul>
        <ul>
          <li>the dots are selectable and represent deliveries</li>
          <li>These are linked to the grid's cards which display tracing data</li>
        </ul>
        <ul>
          <li>The right panel displays ratings for the specific supplier selected</li>
        </ul>
      </div>
    </div>
  )
}

export default EmptyDisplay
