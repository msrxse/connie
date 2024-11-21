import { useMemo } from 'react'

import { ScaleTime, utcFormat } from 'd3'

type AxisBottomProps = {
  xScale: ScaleTime<number, number>
  pixelsPerTick: number
  height: number
}

// tick length
const TICK_LENGTH = 10

export const AxisBottom = ({ xScale, pixelsPerTick, height }: AxisBottomProps) => {
  const range = xScale.range()
  const formatTime = utcFormat('%b %Y')

  const ticks = useMemo(() => {
    const width = range[1] - range[0]
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick)

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value: formatTime(value),
      xOffset: xScale(value),
    }))
  }, [xScale])

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={xOffset} transform={`translate(${xOffset}, 0)`}>
          <line
            y1={TICK_LENGTH}
            y2={-height - TICK_LENGTH}
            stroke="#D2D7D3"
            strokeWidth={0.5}
            shapeRendering={'crispEdges'}
          />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px) rotate(-90deg)',
              fill: '#D2D7D3',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  )
}
