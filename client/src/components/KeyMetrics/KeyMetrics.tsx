import { useGetDeliveryIdBySupplier, useKeyMetricById } from '@/hooks/dashboard'
import { SelectOptions } from '@/types/dashboard'

import styles from './KeyMetrics.module.css'

function KeyMetrics({
  selectedMaterial,
  supplier,
}: {
  selectedMaterial: string
  supplier: string
}) {
  // we take the delivery_id in "suppliers" cache and call getKeyMetrics
  // we ave done this because those supplier names aren't the same since were generated separately
  // But this teach us how to access react-query querycache and extract a piece of data we need
  const getDeliveryId = useGetDeliveryIdBySupplier(selectedMaterial)
  const deliveryId = getDeliveryId(supplier)?.['delivery_id']

  // Now I can call keyMetrics with this ID
  const {
    isPending: keyMetricByIdIsPending,
    error: keyMetricByIdError,
    data: keyMetricByIdData,
  } = useKeyMetricById(deliveryId)

  console.log(keyMetricByIdData)

  return <div className={styles.keyMetrics}>Key metrics go here</div>
}

export default KeyMetrics
