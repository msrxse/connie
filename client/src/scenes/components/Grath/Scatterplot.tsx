import { Dispatch, SetStateAction, useState } from 'react'

import * as d3 from 'd3'

import { setDeliveryItem, useDashboard } from '@/scenes/Dashboard/context/dashboardContext'
import { ItemsByType, SelectOptions } from '@/types/dashboard'

import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import styles from './Scatterplot.module.css'
import { InteractionData, Tooltip } from './Tooltip'

const MARGIN = { top: 40, right: 20, bottom: 80, left: 40 }

type ScatterplotProps = {
  width: number
  height: number
  data: ItemsByType[] | undefined
}

export const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
  const { state, dispatch } = useDashboard()

  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const [hovered, setHovered] = useState<InteractionData | null>(null)
  const [hoveredSupplier, setHoveredSupplier] = useState<string | null>(null)

  if (!data) {
    return null
  }

  // Scales
  const allLinesData = data.map((x) => x['total_amount'])
  const selectedDates = data.map((x) => x['expiration_date'])
  const valueDomain = d3.extent(allLinesData)
  const timeDomain = d3.extent(selectedDates)

  const yScale = d3
    .scaleLinear()
    .domain(valueDomain as number[])
    .range([boundsHeight, 0])
  const xScale = d3
    .scaleUtc()
    .range([0, boundsWidth])
    .domain(timeDomain as unknown as [number, number])
  const allSuppliers = data.map((d) => String(d.supplier))
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allSuppliers)
    .range(['#e0ac2b', '#e85252', '#6689c6', '#9a6fb0', '#a53253'])

  // Build the shapes
  const allShapes = data.map((d, i) => {
    const className = // class if the circle depends on the hover state
      hoveredSupplier && d.supplier !== hoveredSupplier
        ? styles.scatterplotCircle + ' ' + styles.dimmed
        : styles.scatterplotCircle

    return (
      <circle
        key={i}
        r={5}
        cx={xScale(d['expiration_date'])}
        cy={yScale(d['total_amount'])}
        className={className} // class is attributed here
        stroke={colorScale(d.supplier)}
        fill={colorScale(d.supplier)}
        fillOpacity={0.7}
        onMouseEnter={() =>
          setHovered({
            xPos: xScale(d['expiration_date']),
            yPos: yScale(d['total_amount']),
            name: d.supplier,
          })
        }
        onMouseLeave={() => {
          setHovered(null)
          return setHoveredSupplier(null)
        }}
        onMouseOver={() => setHoveredSupplier(d.supplier)} // callback to update the state
        onMouseDown={() => {
          // sets the whole item as selected in main provider / helps selection on chart and grid
          setDeliveryItem(dispatch, d)
        }}
      />
    )
  })

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom xScale={xScale} pixelsPerTick={40} height={boundsHeight} />
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>

      {/* Tooltip */}
      <div
        style={{
          width: boundsWidth,
          height: boundsHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          marginLeft: MARGIN.left,
          marginTop: MARGIN.top,
        }}
      >
        <Tooltip interactionData={hovered} />
        <Tooltip
          interactionData={{
            xPos: xScale(state?.deliveryItem?.expiration_date),
            yPos: yScale(state?.deliveryItem?.total_amount),
            name: state?.deliveryItem?.supplier,
          }}
        />
      </div>
    </div>
  )
}
