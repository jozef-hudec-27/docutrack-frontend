import { useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { toast } from 'react-hot-toast'
import { FileEarmark, Tag, Download, Pencil, Trash3 } from 'react-bootstrap-icons'

import useDocumentStore from '../../state/document-store'

import api from '../../api/axios-instance'
import { limitLength } from '../../utils'

import type { Document as DocumentType } from '../../types/document-types'

type DocumentProps = {
  doc: DocumentType
}

function Document({ doc }: DocumentProps) {
  const [expanded, setExpanded] = useState(false)
  const moreButtonRef = useRef<HTMLButtonElement>(null)

  const [setDocumentToEdit, setDocumentToDelete] = useDocumentStore(
    useShallow((state) => [state.setDocumentToEdit, state.setDocumentToDelete])
  )

  async function downloadFile() {
    const fileName = doc.file_path.split('documents/')[1]

    try {
      const response = await api(true).get(`/files/${fileName}`, { responseType: 'blob' })
      const blob = response.data
      const fileExtension = fileName.split('.')[1]
      const url = window.URL.createObjectURL(blob)

      const downloadLink = document.createElement('a')
      downloadLink.style.display = 'none'
      downloadLink.href = url
      downloadLink.download = `${doc.name}.${fileExtension}`
      document.body.appendChild(downloadLink)
      downloadLink.click()

      window.URL.revokeObjectURL(url)
      document.body.removeChild(downloadLink)
    } catch {
      toast('Failed to download the file.', { icon: '😠' })
    }
  }

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
        <p className="text-sm" aria-label={`Document tag: ${doc.tag}`}>
          {limitLength(doc.tag, 50)}
        </p>
      </div>

      <div className="flex items-center gap-[12px] text-black-100">
        <FileEarmark size={24} className="min-w-[24px]" aria-hidden />
        <p>{limitLength(doc.name, 75)}</p>
      </div>

      {expanded && (
        <>
          {doc.description && <p className="mt-[8px] text-black-75 text-sm text-justify">{doc.description} </p>}
          <div className="flex gap-[24px] mt-[16px] text-black-75">
            <button className="document__action-btn" aria-label="Download" title="Download" onClick={downloadFile}>
              <Download size={16} aria-hidden />
            </button>

            <button
              className="document__action-btn"
              aria-label="Edit"
              title="Edit"
              onClick={() => setDocumentToEdit(doc)}
            >
              <Pencil size={16} aria-hidden />
            </button>

            <button
              className="document__action-btn"
              aria-label="Delete"
              title="Delete"
              onClick={() => setDocumentToDelete(doc)}
            >
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
