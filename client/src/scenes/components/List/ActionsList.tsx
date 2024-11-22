import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'

import { useTraceActions } from '@/hooks/dashboard'

import Card from './Card/Card'

export default function ActionsList() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const listRef = useRef<List>(null)
  const {
    isPending: traceActionsPending,
    error: traceActionsError,
    data: traceActionsData,
  } = useTraceActions()
  // Calculate row height based on whether the row is expanded
  const getRowHeight = useCallback(
    (index: number) => (expandedRows.has(index) ? 705 : 100),
    [expandedRows],
  )

  // Toggles row expansion
  const toggleRow = useCallback((index: number) => {
    setExpandedRows((prev) => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(index)) {
        newExpanded.delete(index)
      } else {
        newExpanded.add(index)
      }
      return newExpanded
    })
  }, [])
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0)
    }
  }, [expandedRows])

  if (!traceActionsData) {
    return null
  }

  return (
    <div style={{ height: '100vh' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            itemData={traceActionsData}
            height={height}
            width={width}
            itemCount={traceActionsData.length}
            itemSize={getRowHeight}
            overscanCount={10}
          >
            {({ index: i, style, data }) => {
              return (
                <Card
                  style={style}
                  data={data[i]}
                  index={i}
                  isExpanded={expandedRows.has(i)}
                  setIsExpanded={() => toggleRow(i)}
                />
              )
            }}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}
