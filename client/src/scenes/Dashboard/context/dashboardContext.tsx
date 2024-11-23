import { createContext, useContext, useReducer } from 'react'

import { ItemsByType } from '@/types/dashboard'

type Action =
  | { type: 'setDeliveryItem'; payload: ItemsByType }
  | {
      type: 'default'
    }
type Dispatch = (action: Action) => void
interface State {
  deliveryItem: ItemsByType | undefined
}
interface DashboardProviderProps {
  children: React.ReactNode
}

const DashboardStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

function dashboardReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setDeliveryItem': {
      const data = action.payload

      return { deliveryItem: data }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  deliveryItem: undefined,
}

function DashboardProvider({ children }: DashboardProviderProps) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  const value = { state, dispatch }

  return <DashboardStateContext.Provider value={value}>{children}</DashboardStateContext.Provider>
}

function useDashboard() {
  const context = useContext(DashboardStateContext)
  if (context === undefined) {
    throw new Error(`useDashboard must be used within a DashboardProvider`)
  }
  return context
}

const setDeliveryItem = (dispatch: Dispatch, payload: SelectOptions) =>
  dispatch({ type: 'setDeliveryItem', payload })

export { DashboardProvider, useDashboard, setDeliveryItem }
