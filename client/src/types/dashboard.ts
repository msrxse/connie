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
  delivery_id: number
  supplier: string
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
  evidence_trace: EvidenceTrace[]
  potential_actions: PotentialActions[]
  alternative_suppliers: AlternativeSuppliers[]
}

type EvidenceTrace = {
  action_id: number
  description: string
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

// trace actions

type SupplierPerformance = {
  on_time_delivery: number // Percentage (0-100)
  quality_rating: number // Rating (0-5)
  price_rating: number // Rating (0-5)
}

type Capacity = {
  current: number // Current capacity
  max: number // Maximum capacity
}

type PotentialAction = {
  action_id: number // Unique identifier for action
  description: string // Description of the action
}

type AlternativeSupplier = {
  id: number // Unique identifier for the supplier
  name: string // Name of the supplier
  online_source: string // URL of the supplier's online source
  estimated_performance: SupplierPerformance // Performance metrics for the alternative supplier
  contact_info: {
    email: string // Contact email for the supplier
    phone: string // Contact phone number for the supplier
  }
}

type TraceAction = {
  delivery_id: number // Unique identifier for the delivery
  supplier: string // Name of the supplier
  performance: SupplierPerformance // Performance metrics for the supplier
  contract_end_date: string // Unix timestamp for the contract's end date
  capacity: Capacity // Capacity details of the supplier
  evidence_trace: EvidenceTrace[] // Array of evidence trace objects
  potential_actions: PotentialAction[] // Array of potential actions
  alternative_suppliers: AlternativeSupplier[] // Array of alternative suppliers
}

export type TraceActions = TraceAction[]
