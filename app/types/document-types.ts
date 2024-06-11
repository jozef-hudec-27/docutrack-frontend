export type Document = {
  id: number
  name: string
  tag: string
  file_path: string
  created_at: string
  updated_at: string
  user_id: number
  description?: string
}

export type FetchDocumentsFn = () => void

export type setDocumentToEditFn = (document: Document | undefined) => void

export type SetDocumentsFn = (updater: Document[] | ((prevDocuments: Document[]) => Document[])) => void
