import { create } from 'zustand'

import { createSetter } from './state-utils'
import api from '../api/axios-instance'

import type { SetFilterFn } from '../types/filter-document-types'
import type { Document, SetDocumentsFn } from '../types/document-types'

type FilterDocumentStore = {
  nameFilter: string
  tagFilter: string
  setNameFilter: SetFilterFn
  setTagFilter: SetFilterFn
  filteredDocuments: Document[]
  setFilteredDocuments: SetDocumentsFn
  showFilteredDocumentsModal: boolean
  setShowFilteredDocumentsModal: (show: boolean) => void
  filterDocuments: (name: string, tag: string) => void
  filteringDocuments: boolean
}

export default create<FilterDocumentStore>()((set) => ({
  nameFilter: '',
  tagFilter: '',
  setNameFilter: createSetter<string, FilterDocumentStore>('nameFilter', set),
  setTagFilter: createSetter<string, FilterDocumentStore>('tagFilter', set),
  filteredDocuments: [],
  setFilteredDocuments: createSetter<Document[], FilterDocumentStore>('filteredDocuments', set),
  showFilteredDocumentsModal: false,
  setShowFilteredDocumentsModal: createSetter<boolean, FilterDocumentStore>('showFilteredDocumentsModal', set),
  filterDocuments: async (name, tag) => {
    set({ filteringDocuments: true })

    let query = ''

    if (name) {
      query += `name=${name}`
    }

    if (tag) {
      query += !!name ? `&tag=${tag}` : `tag=${tag}`
    }

    const { data } = await api(true).get(`/documents?${query}`)
    set({ filteredDocuments: data.data, filteringDocuments: false })
  },
  filteringDocuments: false,
}))
