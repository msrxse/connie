import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getArticles,
  getItemsByType,
  getKeyMetricById,
  getMaterialTypes,
  getSuppliers,
} from '@/services/dashboard'
import { KeyMetric, SelectOptions } from '@/types/dashboard'

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
    queryKey: ['items_by_type', id],
    queryFn: () => getKeyMetricById(id),
    select: (metrics) => metrics[0],
    enabled: !!id,
  })
}

/**
 * To search and extract a record from the QueryCache in TanStack Query, you can use the
 * `find` method. This method allows you to look up individual queries based on their
 * query key
 */
export const useGetDeliveryIdBySupplier = (selectedMaterial: string) => {
  const queryClient = useQueryClient()

  const getRecord = (supplier: string) => {
    if (!supplier) {
      return undefined
    }
    const queryKey = ['items_by_type', selectedMaterial]
    const query = queryClient.getQueryCache().find({ queryKey })
    return query ? query.state?.data?.filter((each) => each.supplier === supplier)[0] : undefined
  }

  return getRecord
}
