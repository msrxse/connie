import { useState } from 'react'
import Select from 'react-select'

import Graph from '@/components/Grath/Graph'
import { useItemsByType, useMaterialTypes } from '@/hooks/dashboard'

import styles from './Dashboard.module.css'

export const Articles = () => {
  const { isPending, error, data } = useMaterialTypes()
  const [selectedOption, setSelectedOption] = useState<any>({})
  const {
    isPending: itemsByTypeIsPending,
    error: itemsByTypeError,
    data: itemsByTypeData,
  } = useItemsByType(selectedOption)

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>Header</header>
      <main className={styles.mainContent}>
        <Select options={data} onChange={setSelectedOption} />
        <Graph isPending={itemsByTypeIsPending} error={itemsByTypeError} data={itemsByTypeData} />
      </main>
      <section className={styles.leftSidebar}>Left sidebar</section>
      <aside className={styles.rightSidebar}>Right sidebar</aside>
      <footer className={styles.footer}>Footer</footer>
    </div>
  )
}

export default Articles
