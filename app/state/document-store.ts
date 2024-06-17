import { create } from 'zustand'

import api from '../api/axios-instance'
import { createSetter } from './state-utils'

import type { Document, FetchDocumentsFn, SetDocumentsFn, setDocumentToEditFn } from '../types/document-types'

type DocumentStore = {
  documents: Document[]
  loading: boolean
  initialLoading: boolean
  fetched: boolean
  fetchDocuments: FetchDocumentsFn
  setDocuments: SetDocumentsFn
  addDocument: (document: Document) => void
  documentToEdit?: Document
  documentToDelete?: Document
  setDocumentToEdit: setDocumentToEditFn
  setDocumentToDelete: setDocumentToEditFn
}

export default create<DocumentStore>()((set) => ({
  documents: [],
  loading: false,
  initialLoading: false,
  fetched: false,
  fetchDocuments: async (page = 1, initial = false) => {
    const getSetObj = (val: boolean) => {
      return initial ? { initialLoading: val } : { loading: val }
    }

    set(getSetObj(true))

    try {
      const response = await api(true).get(`/documents?page=${page}`)
      set({ fetched: true })
      set(getSetObj(false))

      return response.data
    } catch (error) {
      set(getSetObj(false))
    }
  },
  setDocuments: createSetter<Document[], DocumentStore>('documents', set),
  addDocument: (document) => set((state) => ({ documents: [document, ...state.documents] })),
  documentToEdit: undefined,
  documentToDelete: undefined,
  setDocumentToEdit: (document) => set({ documentToEdit: document }),
  setDocumentToDelete: (document) => set({ documentToDelete: document }),
}))
