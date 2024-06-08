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
