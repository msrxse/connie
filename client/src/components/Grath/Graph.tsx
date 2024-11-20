import { ItemsByType } from '@/types/dashboard'

import styles from './Graph.module.css'

export default function Graph({
  isPending,
  error,
  data,
}: {
  data?: ItemsByType[]
  isPending: any
  error: any
}) {
  console.log('OLAKEAJSE', isPending, error, data)

  return <div className={styles.graph}>Graph goes here</div>
}
