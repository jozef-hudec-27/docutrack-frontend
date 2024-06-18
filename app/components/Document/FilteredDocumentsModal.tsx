import useFilterDocumentStore from '../../state/filter-document-store'

import FilterDocumentsForm from './FilterDocumentsForm'
import Modal from '../modal/Modal'
import Document from './Document'

function FilteredDocumentsModal() {
  const [
    filteredDocuments,
    setFilteredDocuments,
    showFilteredDocumentsModal,
    setShowFilteredDocumentsModal,
    filteringDocuments,
  ] = useFilterDocumentStore((state) => [
    state.filteredDocuments,
    state.setFilteredDocuments,
    state.showFilteredDocumentsModal,
    state.setShowFilteredDocumentsModal,
    state.filteringDocuments,
  ])

  function setIsOpen(open: boolean) {
    setShowFilteredDocumentsModal(open)

    if (!open) {
      setFilteredDocuments([])
    }
  }

  return (
    <Modal isOpen={showFilteredDocumentsModal} setIsOpen={setIsOpen} cls="!w-11/12 !sm:w-3/4">
      <FilterDocumentsForm modal />

      <div className="flex flex-col gap-[32px] w-11/12 md:w-1/2 mx-auto mt-[96px] h-[200px] sm:h-[400px] overflow-y-auto">
        {filteringDocuments && <p>Filtering documents...</p>}

        {!filteringDocuments &&
          (!!filteredDocuments.length ? (
            filteredDocuments.map((doc) => {
              return <Document key={doc.id} doc={doc} />
            })
          ) : (
            <p>No documents found.</p>
          ))}
      </div>
    </Modal>
  )
}

export default FilteredDocumentsModal
