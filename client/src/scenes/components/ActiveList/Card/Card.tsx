import { BiInfoSquare, BiSelectMultiple } from 'react-icons/bi'

import Button from '@/components/Button/Button'
import Container from '@/components/Container/Container'
import { Icons } from '@/components/Icons/Icons'
import Input from '@/components/Input/Input'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import TextField from '@/components/TextField/TextField'
import { setDeliveryId, useDashboard } from '@/scenes/Dashboard/context/dashboardContext'
import { Supplier } from '@/types/dashboard'

import styles from './Card.module.css'

const Card = ({
  style,
  data,
  index,
  isExpanded,
  setIsExpanded,
}: {
  style: any
  data: Supplier
  index: number
  isExpanded: boolean
  setIsExpanded: any
}) => {
  const { state, dispatch } = useDashboard()
  const isSelected = state.deliveryId === data.delivery_id

  return (
    <div style={style} className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      <section>
        <div className={styles.toolbar}>
          <Button isDroor onClick={setIsExpanded} index={index} isExpanded={isExpanded}>
            {data.supplier}
          </Button>
          <div className={styles.rightToolbar}>
            <Button onClick={() => setDeliveryId(dispatch, data.delivery_id)} index={index}>
              <Icons>
                <BiSelectMultiple color={isSelected ? 'green' : 'grey'} />
              </Icons>
            </Button>
            <Button onClick={setIsExpanded} index={index}>
              <Icons>
                <BiInfoSquare color={'red'} />
              </Icons>
            </Button>
          </div>
        </div>
        <div className={styles.cardMain}>
          <ProgressBar title={'On-time Delivery'} progress={data.performance.on_time_delivery} />
          <Input
            index={index}
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
            index={index}
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
            index={index}
            type="text"
            label="Contract End Date"
            value={new Date(data.contract_end_date).toLocaleString()}
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
            <h3>Evidence Trace</h3>
            <ul>
              <Container>
                {data.evidence_trace.map((evidence: Action) => (
                  <li key={evidence.evidence_id}>
                    <Container type="item">
                      <TextField>{evidence.description}</TextField>
                    </Container>
                  </li>
                ))}
              </Container>
            </ul>
          </section>
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
                    index={index}
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
                    index={index}
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
