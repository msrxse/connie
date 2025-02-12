import { Dispatch, SetStateAction, useRef } from 'react'

import { useDimensions } from '@/hooks/useDimentions'
import { Scatterplot } from '@/scenes/components/Grath/Scatterplot'
import { ItemsByType, SelectOptions } from '@/types/dashboard'

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
  const ref = useRef(null)
  const { width, height } = useDimensions(ref)

  return (
    <div ref={ref} className={styles.graph}>
      <Scatterplot width={width} height={height} data={data} />
    </div>
  )
}
