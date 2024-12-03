import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getArticles,
  getItemsByType,
  getKeyMetricById,
  getMaterialTypes,
  getSuppliers,
  getTraceActions,
} from '@/services/dashboard'
import { SelectOptions } from '@/types/dashboard'

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })
}

export const useMaterialTypes = () => {
  return useQuery({
    queryKey: ['material_types'],
    queryFn: getMaterialTypes,
  })
}

export const useItemsByType = ({ value }: SelectOptions) => {
  return useQuery({
    queryKey: ['items_by_type', value],
    queryFn: () => getItemsByType(value),
    enabled: !!value,
  })
}

export const useSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  })
}

export const useKeyMetricById = (id: number) => {
  return useQuery({
    queryKey: ['metrics_by_type', id],
    queryFn: () => getKeyMetricById(id),
    select: (metrics) => metrics[0],
    enabled: !!id,
  })
}

export const useGetSupplierByDeliveryId = (selectedMaterial: string | null) => {
  const queryClient = useQueryClient()

  const getRecord = (deliveryId: number | undefined) => {
    if (!deliveryId) {
      return undefined
    }
    const queryKey = ['items_by_type', selectedMaterial]
    const query = queryClient.getQueryCache().find({ queryKey })
    return query
      ? query.state?.data?.filter((each) => each.delivery_id === deliveryId)[0]
      : undefined
  }

  return getRecord
}

export const useTraceActions = () => {
  return useQuery({
    queryKey: ['trace_actions'],
    queryFn: getTraceActions,
  })
}
