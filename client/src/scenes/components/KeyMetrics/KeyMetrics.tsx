import Input from '@/components/Input/Input'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import { useKeyMetricById } from '@/hooks/dashboard'
import { useDashboard } from '@/scenes/Dashboard/context/dashboardContext'

import styles from './KeyMetrics.module.css'

function KeyMetrics() {
  const { state } = useDashboard()
  const selectedDeliveryId = state?.deliveryItem?.delivery_id
  const supplier = state?.deliveryItem?.supplier

  // Now I can call keyMetrics with this ID
  const {
    isPending: keyMetricByIdIsPending,
    error: keyMetricByIdError,
    data: keyMetricByIdData,
  } = useKeyMetricById(selectedDeliveryId)

  if (!keyMetricByIdData) {
    return null
  }

  // Delivery aliases
  const averageDeliveryDelayDays =
    keyMetricByIdData.performance_metrics.delivery.average_delivery_delay_days
  const onTimePercentage = keyMetricByIdData.performance_metrics.delivery.on_time_percentage

  // Quality aliases
  const defectiveRatePercentage =
    keyMetricByIdData.performance_metrics.quality.defective_rate_percentage
  const productComplianceRatePercentage =
    keyMetricByIdData.performance_metrics.quality.product_compliance_rate_percentage

  // Responsiveness aliases
  const averageResponseTimeHours =
    keyMetricByIdData.performance_metrics.responsiveness.average_response_time_hours
  const resolutionRatePercentage =
    keyMetricByIdData.performance_metrics.responsiveness.resolution_rate_percentage

  // Financial aliases
  const costVariancePercentage =
    keyMetricByIdData.performance_metrics.financial.cost_variance_percentage
  const invoicingAccuracyPercentage =
    keyMetricByIdData.performance_metrics.financial.invoicing_accuracy_percentage
  const overallRating = keyMetricByIdData.overall_rating
  const comments = keyMetricByIdData.comments

  return (
    <div className={styles.keyMetrics}>
      <form className={styles.keyMetricsForm}>
        <h3>
          Aggregated Performance Metrics for <span>{supplier}</span>
        </h3>
        <section>
          <legend>Delivery</legend>
          <Input
            type="text"
            label="Average Delivery Delay Days"
            value={averageDeliveryDelayDays}
            name="average_delivery_delay_days"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
          <ProgressBar title={'On-Time Percentage'} progress={onTimePercentage} />
        </section>

        <section>
          <legend>Quality</legend>
          <Input
            type="text"
            label="Defective Rate Percentage"
            value={defectiveRatePercentage}
            name="defective_rate_percentage"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
          <ProgressBar
            title={'Product Compliance Rate Percentage'}
            progress={productComplianceRatePercentage}
          />
        </section>

        <section>
          <legend>Responsiveness</legend>
          <Input
            type="text"
            label="Average Response Time Hours"
            value={averageResponseTimeHours}
            name="average_response_time_hours"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
          <ProgressBar title={'Resolution Rate Percentage'} progress={resolutionRatePercentage} />
        </section>

        <section>
          <legend>Financial</legend>
          <Input
            type="text"
            label="Cost Variance Percentage"
            value={costVariancePercentage}
            name="cost_variance_percentage"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
          <ProgressBar
            title={'Invoicing Accuracy Percentage'}
            progress={invoicingAccuracyPercentage}
          />
        </section>

        <section>
          <Input
            type="text"
            label="Overall Rating"
            value={overallRating}
            name="overall_rating"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
          <Input
            type="text"
            label="Comments"
            value={comments}
            name="comments"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
            isTextArea
          />
        </section>
      </form>
    </div>
  )
}

export default KeyMetrics
