import { GlyphBrowse } from 'assets/GlyphBrowse'
import type { StakePool } from 'hooks/useAllStakePools'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import { CollectionsGrid } from './CollectionsGrid'

type VIEW_OPTIONS = 'grid' | 'list'
const VIEW_TABS: {
  label: JSX.Element
  value: VIEW_OPTIONS
  disabled?: boolean
  tooltip?: string
}[] = [
  {
    label: <GlyphBrowse />,
    value: 'grid',
  },
  {
    label: <AiOutlineMenu className="text-xl" />,
    value: 'list',
  },
]

export const CollectionsView = ({
  configs,
  header,
}: {
  configs?: StakePool[]
  header?: { title?: string; description?: string }
}) => {
  const [view, setView] = useState<VIEW_OPTIONS>()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(
    () =>
      view &&
      window.scrollTo({
        behavior: 'smooth',
        top: (ref.current?.offsetTop ?? 0) - 50,
      }),
    [view]
  )
  return (
    <div ref={ref}>
      <div className="flex flex-col gap-2">
        {header?.title && (
          <>
            <div className="text-5xl text-light-0">{header.title}</div>
          </>
        )}
        <div className="flex items-center justify-between">
          <div className="mb-6 text-lg text-medium-3">
            {header?.description}{' '}
          </div>
        </div>
      </div>
        <div >
          <CollectionsGrid configs={configs} />
          <div/>
        </div>
    </div>
  )
}
