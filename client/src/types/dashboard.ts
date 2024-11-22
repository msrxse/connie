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
  country_of_origin: string
  material_type: string
}

export type SelectOptions = {
  value: string
  label: string
}

export type KeyMetric = {
  supplier_id: number
  supplier: string
  performance_metrics: {
    delivery: {
      on_time_percentage: number
      average_delivery_delay_days: number
    }
    quality: {
      defective_rate_percentage: number
      product_compliance_rate_percentage: number
    }
    responsiveness: {
      average_response_time_hours: number
      resolution_rate_percentage: number
    }
    financial: {
      cost_variance_percentage: number
      invoicing_accuracy_percentage: number
    }
  }
  overall_rating: number
  comments: string
}

export type Supplier = {
  id: number
  name: string
  performance: {
    on_time_delivery: number
    quality_rating: number
    price_rating: number
  }
  contract_end_date: string
  capacity: {
    current: number
    max: number
  }
  potential_actions: PotentialActions[]
  alternative_suppliers: AlternativeSuppliers[]
}

export type PotentialActions = {
  action_id: number
  description: string
}

export type AlternativeSuppliers = {
  id: number
  name: string
  online_source: string
  estimated_performance: {
    on_time_delivery: number
    quality_rating: number
    price_rating: number
  }
  contact_info: {
    email: string
    phone: string
  }
}
