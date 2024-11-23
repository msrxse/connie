import Dashboard from '@/scenes/Dashboard/Dashboard/Dashboard'
import { DashboardProvider } from '@/scenes/Dashboard/context/dashboardContext'

const DashboardContainer = () => (
  <DashboardProvider>
    <Dashboard />
  </DashboardProvider>
)

export default DashboardContainer
