import { useShallow } from 'zustand/react/shallow'
import { Filter } from 'react-bootstrap-icons'

import useFilterDocumentStore from '../../state/filter-document-store'

import useInputs from '../../hooks/useInputs'

import type { FormEvent } from 'react'

type FilterDocumentsFormProps = {
  modal?: boolean
}

function FilterDocumentsForm(props: FilterDocumentsFormProps) {
  const [nameFilter, tagFilter, setNameFilter, setTagFilter, filterDocuments, setShowFilteredDocumentsModal] =
    useFilterDocumentStore(
      useShallow((state) => [
        state.nameFilter,
        state.tagFilter,
        state.setNameFilter,
        state.setTagFilter,
        state.filterDocuments,
        state.setShowFilteredDocumentsModal,
      ])
    )
  const inputElements = useInputs({
    inputs: [
      {
        type: 'text',
        className: 'input input--small w-[300px]',
        id: props.modal ? 'input-name-filter-modal' : 'input-name-filter',
        placeholder: 'Name',
        'aria-label': 'Filter documents by name',
        value: nameFilter,
        onChange: (e) => {
          setNameFilter(e.target.value)
        },
      },
      {
        type: 'text',
        className: 'input input--small w-[150px]',
        id: props.modal ? 'input-tag-filter-modal' : 'input-tag-filter',
        placeholder: 'Tag',
        'aria-label': 'Filter documents by tag',
        value: tagFilter,
        onChange: (e) => {
          setTagFilter(e.target.value)
        },
      },
    ],
  })

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setShowFilteredDocumentsModal(true)
    filterDocuments(nameFilter, tagFilter)
  }

  return (
    <form className="flex justify-center items-center gap-[16px] flex-wrap" onSubmit={onSubmit}>
      {inputElements}
      <button
        type="submit"
        className="btn btn--secondary flex items-center gap-[8px] ml-[8px]"
        title="Filter documents"
      >
        <Filter size={24} aria-hidden />
        Filter
      </button>
    </form>
  )
}

export default FilterDocumentsForm
