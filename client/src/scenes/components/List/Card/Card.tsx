import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import TextField from '@/components/TextField/TextField'
import { AlternativeSuppliers, PotentialActions, Supplier } from '@/types/dashboard'

import styles from './Card.module.css'

/**
 * CARDS
 *
 */
const Card = ({
  data,
  index,
  isExpanded,
  setIsExpanded,
}: {
  data: Supplier
  index: number
  isExpanded: boolean
  setIsExpanded: any
}) => {
  return (
    <div className={styles.card}>
      <section>
        <Button onClick={setIsExpanded} index={index} isExpanded={isExpanded}>
          {data.name}
        </Button>

        <div className={styles.section}>
          <ProgressBar title={'On-time Delivery'} progress={data.performance.on_time_delivery} />
          <Input
            type="text"
            label="Quality Rating"
            value={data.performance.quality_rating}
            name="quality_rating"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
          <Input
            type="text"
            label="Price Rating"
            value={data.performance.price_rating}
            name="price_rating"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
          <ProgressBar title={'Capacity'} progress={data.capacity.current} />
          <Input
            type="text"
            label="Contract End Date"
            value={data.contract_end_date}
            name="price_rating"
            error={false}
            onChange={() => null}
            placeholder={''}
            disabled
          />
        </div>
      </section>

      {isExpanded && (
        <div className={styles.expandedDiv}>
          <section>
            <h3>Recommended Actions</h3>
            <ul>
              {data.potential_actions.map((action: Action) => (
                <li key={action.action_id}>
                  <TextField>{action.description}</TextField>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Alternative Suppliers</h3>
            <ul>
              {data.alternative_suppliers.map((altSupplier: AlternativeSupplier) => (
                <li key={altSupplier.id}>
                  <h4>{altSupplier.name}</h4>
                  <ProgressBar
                    title={'Estimated_performance: On Time Delivery'}
                    progress={altSupplier.estimated_performance.on_time_delivery}
                  />
                  <Input
                    type="text"
                    label="Estimated performance: Quality Rating"
                    value={altSupplier.estimated_performance.quality_rating}
                    name="quality_rating"
                    error={false}
                    onChange={() => null}
                    placeholder={''}
                    disabled
                  />
                  <Input
                    type="text"
                    label="Estimated performance: Price Rating"
                    value={altSupplier.estimated_performance.price_rating}
                    name="price_rating"
                    error={false}
                    onChange={() => null}
                    placeholder={''}
                    disabled
                  />

                  <TextField>
                    Contact: {altSupplier.contact_info.email}, {altSupplier.contact_info.phone}
                  </TextField>

                  <TextField>
                    More Info:
                    <a href={altSupplier.online_source} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </TextField>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  )
}

export default Card
