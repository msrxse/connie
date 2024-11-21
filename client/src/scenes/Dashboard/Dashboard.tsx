import { useState } from 'react'
import Select from 'react-select'

import Graph from '@/components/Grath/Graph'
import KeyMetrics from '@/components/KeyMetrics/KeyMetrics'
import { useItemsByType, useMaterialTypes, useSuppliers } from '@/hooks/dashboard'
import { SelectOptions } from '@/types/dashboard'

import styles from './Dashboard.module.css'

export const Articles = () => {
  const {
    isPending: materialTypesPending,
    error: materialTypesError,
    data: materialTypesData,
  } = useMaterialTypes()
  const [selectedItemsByTypeOption, setSelectedItemsByTypeOption] = useState<
    SelectOptions | undefined
  >()
  const [selectedSupplierOption, setSelectedSupplierOption] = useState<SelectOptions | undefined>()
  const [selectedMaterialOption, setSelectedMaterialOption] = useState<SelectOptions | undefined>()
  const {
    isPending: itemsByTypeIsPending,
    error: itemsByTypeError,
    data: itemsByTypeData,
  } = useItemsByType(selectedItemsByTypeOption || { value: '', label: '' })
  const { isPending: suppliersPending, error: suppliersError, data: suppliersData } = useSuppliers()
  const getSelectedMaterialOption = (selected: SelectOptions | undefined) => {
    setSelectedItemsByTypeOption(selected)
    setSelectedMaterialOption(selected)
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>Supplier Performance Monitoring System</header>
      <main className={styles.mainContent}>
        <Select
          value={selectedMaterialOption}
          options={materialTypesData}
          onChange={getSelectedMaterialOption}
        />
        <Graph
          isPending={itemsByTypeIsPending}
          error={itemsByTypeError}
          data={itemsByTypeData}
          setSelectedSupplierOption={setSelectedSupplierOption}
        />
      </main>
      <section className={styles.leftSidebar}>Left sidebar</section>
      <aside className={styles.rightSidebar}>
        <Select
          value={selectedSupplierOption}
          options={suppliersData}
          onChange={setSelectedSupplierOption}
        />
        <KeyMetrics
          selectedMaterial={selectedMaterialOption?.value}
          supplier={selectedSupplierOption?.value}
        />
      </aside>
      <footer className={styles.footer}>Footer</footer>
    </div>
  )
}

export default Articles
