import { Article, ItemsByType, KeyMetric, MaterialType } from '@/types/dashboard'
import { SelectOptions } from '@/types/dashboard'

import api from './api'

export const getArticles = async () => {
  const response = await api.get<Article[]>('/articles')
  return response?.data
}

export const getMaterialTypes = async () => {
  const response = await api.get<MaterialType[]>('/material_types')
  return response?.data
}

export const getItemsByType = async (selectedOption: string) => {
  const response = await api.get<ItemsByType[]>(`/itemsByType?material_type=${selectedOption}`)
  return response?.data
}

export const getSuppliers = async () => {
  const response = await api.get<SelectOptions[]>('/suppliers')
  return response?.data
}

export const getKeyMetricById = async (id: number) => {
  const response = await api.get<KeyMetric>(`/key_metric?delivery_id=${id}`)
  return response?.data
}
