import { useCallback, useRef, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'

import { useDimensions } from '@/hooks/useDimentions'

import styles from './ActionsList.module.css'
import Card from './Card/Card'

export default function ActionsList() {
  const ref = useRef(null)
  const [isExpanded, setIsExpanded] = useState(-1)
  // const { height, width } = useDimensions(ref)
  const getItemSize = useCallback((index: number) => {
    return isExpanded === index ? 200 : 100
  }, [])
  const toggleExpanded = (index: number) => {
    return setIsExpanded(isExpanded === index ? -1 : index)
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          itemData={data.suppliers}
          height={height}
          itemCount={data.suppliers.length}
          itemSize={getItemSize}
          width={width}
          overscanCount={10}
          initialScrollOffset={0}
        >
          {({ index: i, style, data }) => {
            return (
              <Card
                data={data[i]}
                index={i}
                isExpanded={isExpanded === i}
                setIsExpanded={toggleExpanded}
              />
            )
          }}
        </List>
      )}
    </AutoSizer>
  )
}

const data = {
  suppliers: [
    {
      id: 1,
      name: 'Supplier A',
      performance: {
        on_time_delivery: 95,
        quality_rating: 4.8,
        price_rating: 4.5,
      },
      contract_end_date: '2025-06-30',
      capacity: {
        current: 80,
        max: 100,
      },
      potential_actions: [
        {
          action_id: 1,
          description: 'Email Supplier A to check if they can increase delivery capacity by 20%.',
        },
        {
          action_id: 2,
          description: 'Prepare termination notice for Supplier B to be sent by January 2024.',
        },
        {
          action_id: 3,
          description: 'Explore online directories for alternative suppliers.',
        },
      ],
      alternative_suppliers: [
        {
          id: 4,
          name: 'Supplier D',
          online_source: 'https://example.com/supplier-d',
          estimated_performance: {
            on_time_delivery: 90,
            quality_rating: 4.5,
            price_rating: 4.2,
          },
          contact_info: {
            email: 'contact@supplierd.com',
            phone: '+123456789',
          },
        },
      ],
    },
    {
      id: 2,
      name: 'Supplier B',
      performance: {
        on_time_delivery: 70,
        quality_rating: 3.5,
        price_rating: 3.2,
      },
      contract_end_date: '2024-12-31',
      capacity: {
        current: 50,
        max: 70,
      },
      potential_actions: [
        {
          action_id: 1,
          description: 'Email Supplier A to check if they can increase delivery capacity by 20%.',
        },
        {
          action_id: 2,
          description: 'Prepare termination notice for Supplier B to be sent by January 2024.',
        },
        {
          action_id: 3,
          description: 'Explore online directories for alternative suppliers.',
        },
      ],
      alternative_suppliers: [
        {
          id: 4,
          name: 'Supplier D',
          online_source: 'https://example.com/supplier-d',
          estimated_performance: {
            on_time_delivery: 90,
            quality_rating: 4.5,
            price_rating: 4.2,
          },
          contact_info: {
            email: 'contact@supplierd.com',
            phone: '+123456789',
          },
        },
      ],
    },
    {
      id: 3,
      name: 'Supplier C',
      performance: {
        on_time_delivery: 60,
        quality_rating: 2.9,
        price_rating: 3.0,
      },
      contract_end_date: '2025-03-31',
      capacity: {
        current: 40,
        max: 60,
      },
      potential_actions: [
        {
          action_id: 1,
          description: 'Email Supplier A to check if they can increase delivery capacity by 20%.',
        },
        {
          action_id: 2,
          description: 'Prepare termination notice for Supplier B to be sent by January 2024.',
        },
        {
          action_id: 3,
          description: 'Explore online directories for alternative suppliers.',
        },
      ],
      alternative_suppliers: [
        {
          id: 4,
          name: 'Supplier D',
          online_source: 'https://example.com/supplier-d',
          estimated_performance: {
            on_time_delivery: 90,
            quality_rating: 4.5,
            price_rating: 4.2,
          },
          contact_info: {
            email: 'contact@supplierd.com',
            phone: '+123456789',
          },
        },
      ],
    },
  ],
}
