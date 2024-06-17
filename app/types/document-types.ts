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

type DocumentsResponse = {
  current_page: number
  data: Document[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}

export type FetchDocumentsFn = (page?: number, initial?: boolean) => Promise<DocumentsResponse>

export type setDocumentToEditFn = (document: Document | undefined) => void

export type SetDocumentsFn = (updater: Document[] | ((prevDocuments: Document[]) => Document[])) => void
