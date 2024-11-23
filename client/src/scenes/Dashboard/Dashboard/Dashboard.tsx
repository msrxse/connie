import { useEffect, useState } from 'react'
import Select from 'react-select'

import Toolbar from '@/components/Toolbar/Toolbar'
import { useItemsByType, useMaterialTypes, useSuppliers } from '@/hooks/dashboard'
import { useDashboard } from '@/scenes/Dashboard/context/dashboardContext'
import ActionsList from '@/scenes/components/ActiveList/ActionsList'
import Graph from '@/scenes/components/Grath/Graph'
import KeyMetrics from '@/scenes/components/KeyMetrics/KeyMetrics'
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
  const [selectedItem, setSelectedItem] = useState({})
  const { state } = useDashboard()

  useEffect(() => {
    if (state.deliveryId !== -1 && itemsByTypeData) {
      const item = itemsByTypeData.filter((each) => each.delivery_id === state.deliveryId)
      setSelectedItem(item[0])
    }
  }, [state.deliveryId])

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
          selectedItem={selectedItem}
        />
        <Toolbar />
        <ActionsList />
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
    </div>
  )
}

export default Articles
