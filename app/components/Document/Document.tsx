import { useRef, useState } from 'react'
import { FileEarmark, Tag, Download, Pencil, Trash3 } from 'react-bootstrap-icons'

import { limitLength } from '../../utils'

import type { Document as DocumentType } from '../../types/document-types'

type DocumentProps = {
  document: DocumentType
}

function Document({ document }: DocumentProps) {
  const [expanded, setExpanded] = useState(false)
  const moreButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <div
      className={`flex flex-col gap-[8px] p-[12px] hover:bg-black-2 focus-within:bg-black-2 rounded-[8px] ${
        !expanded ? 'cursor-pointer' : ''
      }`}
      onClick={() => {
        if (expanded) {
          return
        }

        moreButtonRef.current?.click()
      }}
    >
      <div className="flex items-center gap-[4px] text-black-50">
        <Tag size={18} aria-hidden />
        <p className="text-sm" aria-label={`Document tag: ${document.tag}`}>
          {limitLength(document.tag, 50)}
        </p>
      </div>

      <div className="flex items-center gap-[12px] text-black-100">
        <FileEarmark size={24} aria-hidden />
        <p>{limitLength(document.name, 75)}</p>
      </div>

      {expanded && (
        <>
          {document.description && (
            <p className="mt-[8px] text-black-75 text-sm text-justify">{document.description} </p>
          )}
          <div className="flex gap-[24px] mt-[16px] text-black-75">
            <button className="document__action-btn" aria-label="Download">
              <Download size={16} aria-hidden />
            </button>

            <button className="document__action-btn" aria-label="Edit">
              <Pencil size={16} aria-hidden />
            </button>

            <button className="document__action-btn" aria-label="Delete">
              <Trash3 size={16} aria-hidden />
            </button>
          </div>
        </>
      )}

      <button
        className="w-fit mt-[8px] text-black-100 text-sm font-bold"
        ref={moreButtonRef}
        onClick={(e) => {
          e.stopPropagation()

          setExpanded((prevExpanded) => !prevExpanded)
        }}
      >
        {expanded ? 'Show less' : '...more'}
      </button>
    </div>
  )
}

export default Document
