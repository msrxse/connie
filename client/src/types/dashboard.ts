export type Article = {
  id: string
  name: string
  description: string
  subscribers_count: number
  stargazers_count: number
  forks_count: number
}

export type MaterialType = String

export type ItemsByType = {
  delivery_id: number
  delivery_date: number
  supplier: string
  item_id: number
  total_amount: number
  expiration_date: number
  quantity: number
}

export type SelectOptions = {
  value: string
  label: string
}
