import { useShallow } from 'zustand/react/shallow'
import { Filter } from 'react-bootstrap-icons'

import useFilterDocumentStore from '../../state/filter-document-store'
import useDocumentStore from '../../state/document-store'

import useInputs from '../../hooks/useInputs'

type FilterDocumentsFormProps = {
  modal?: boolean
}

function FilterDocumentsForm(props: FilterDocumentsFormProps) {
  const [nameFilter, tagFilter, setNameFilter, setTagFilter, setFilteredDocuments] = useFilterDocumentStore(
    useShallow((state) => [
      state.nameFilter,
      state.tagFilter,
      state.setNameFilter,
      state.setTagFilter,
      state.setFilteredDocuments,
    ])
  )
  const [allDocuments] = useDocumentStore(useShallow((state) => [state.documents]))

  function filterDocuments(name: string, tag: string) {
    setFilteredDocuments((prevFiltered) => {
      const filteredDocuments = allDocuments.filter((document) => {
        return (
          (!!name && document.name.toLowerCase().includes(name.toLowerCase())) ||
          (!!tag && document.tag.toLowerCase().includes(tag.toLowerCase()))
        )
      })

      return filteredDocuments
    })
  }

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
          filterDocuments(e.target.value, tagFilter)
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
          filterDocuments(nameFilter, e.target.value)
        },
      },
    ],
  })

  return (
    <form className="flex justify-center items-center gap-[16px] flex-wrap">
      {inputElements}
      <button className="btn btn--secondary flex items-center gap-[8px] ml-[8px]" title="Filter documents">
        <Filter size={24} aria-hidden />
        Filter
      </button>
    </form>
  )
}

export default FilterDocumentsForm
