import { create } from 'zustand'

import api from '../api/axios-instance'
import { createSetter } from './state-utils'

import type { Document, FetchDocumentsFn, SetDocumentsFn, setDocumentToEditFn } from '../types/document-types'

type DocumentsStore = {
  documents: Document[]
  loading: boolean
  fetched: boolean
  fetchDocuments: FetchDocumentsFn
  setDocuments: SetDocumentsFn
  documentToEdit?: Document
  setDocumentToEdit: setDocumentToEditFn
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
  setDocuments: createSetter<Document[], DocumentsStore>('documents', set),
  documentToEdit: undefined,
  setDocumentToEdit: (document) => set({ documentToEdit: document }),
}))
