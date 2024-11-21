import { useQuery } from '@tanstack/react-query'

import { getArticles, getItemsByType, getMaterialTypes, getSuppliers } from '@/services/dashboard'
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
