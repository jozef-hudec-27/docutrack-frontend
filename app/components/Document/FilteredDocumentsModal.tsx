import { useEffect } from 'react'

import useFilterDocumentStore from '../../state/filter-document-store'

import FilterDocumentsForm from './FilterDocumentsForm'
import Modal from '../modal/Modal'
import Document from './Document'

function FilteredDocumentsModal() {
  const [filteredDocuments, setFilteredDocuments, nameFilter, tagFilter] = useFilterDocumentStore((state) => [
    state.filteredDocuments,
    state.setFilteredDocuments,
    state.tagFilter,
    state.nameFilter,
  ])

  useEffect(() => {
    if (nameFilter || tagFilter) {
      // Name filter input or tag filter input must be focused before the modal is opened
      const activeElement = document.activeElement

      const modalInputId = `${activeElement?.id}-modal`

      setTimeout(() => {
        document.getElementById(modalInputId)?.focus()
      }, 0)
    }
  }, [nameFilter, tagFilter])

  return (
    <Modal isOpen={!!nameFilter || !!tagFilter} setIsOpen={function () {}} cls="!w-11/12 !sm:w-3/4">
      <FilterDocumentsForm modal />

      <div className="flex flex-col gap-[32px] w-11/12 md:w-1/2 mx-auto mt-[96px] h-[400px] overflow-y-auto">
        {!!filteredDocuments.length ? (
          filteredDocuments.map((doc) => {
            return <Document key={doc.id} doc={doc} />
          })
        ) : (
          <p>No documents found.</p>
        )}
      </div>
    </Modal>
  )
}

export default FilteredDocumentsModal
