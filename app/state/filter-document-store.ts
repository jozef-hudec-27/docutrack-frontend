import { create } from 'zustand'

import { createSetter } from './state-utils'

import type { SetFilterFn } from '../types/filter-document-types'
import type { Document, SetDocumentsFn } from '../types/document-types'

type FilterDocumentStore = {
  nameFilter: string
  tagFilter: string
  setNameFilter: SetFilterFn
  setTagFilter: SetFilterFn
  filteredDocuments: Document[]
  setFilteredDocuments: SetDocumentsFn
}

export default create<FilterDocumentStore>()((set) => ({
  nameFilter: '',
  tagFilter: '',
  setNameFilter: createSetter<string, FilterDocumentStore>('nameFilter', set),
  setTagFilter: createSetter<string, FilterDocumentStore>('tagFilter', set),
  filteredDocuments: [],
  setFilteredDocuments: createSetter<Document[], FilterDocumentStore>('filteredDocuments', set),
}))
