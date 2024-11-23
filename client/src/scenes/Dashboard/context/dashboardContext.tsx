import { createContext, useContext, useReducer } from 'react'

type Action =
  | { type: 'setDeliveryId'; payload: number }
  | {
      type: 'default'
    }
type Dispatch = (action: Action) => void
interface State {
  deliveryId: number
}
interface DashboardProviderProps {
  children: React.ReactNode
}

const DashboardStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

function dashboardReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setDeliveryId': {
      const data = action.payload

      return { deliveryId: data }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  deliveryId: -1,
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

const setDeliveryId = (dispatch: Dispatch, payload: SelectOptions) =>
  dispatch({ type: 'setDeliveryId', payload })

export { DashboardProvider, useDashboard, setDeliveryId }
