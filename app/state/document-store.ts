import { create } from 'zustand'

import api from '../api/axios-instance'

import type { Document, FetchDocumentsFn } from '../types/document-types'

type DocumentsStore = {
  documents: Document[]
  loading: boolean
  fetched: boolean
  fetchDocuments: FetchDocumentsFn
}

export default create<DocumentsStore>()((set) => ({
  documents: [],
  loading: true,
  fetched: false,
  fetchDocuments: async () => {
    set({ loading: true })

    try {
      const response = await api(true).get('/documents')
      set({ documents: response.data, loading: false, fetched: true })
    } catch (error) {
      set({ loading: false })
    }
  },
}))
