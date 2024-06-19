export type SetFilterUpdaterFn = (prevFilter: string) => string

export type SetFilterFn = (updater: SetFilterUpdaterFn | string) => void

export type FilterDocumentsFn = (name: string, tag: string) => void

export type SetShowFilteredDocumentsModalFn = (show: boolean) => void
