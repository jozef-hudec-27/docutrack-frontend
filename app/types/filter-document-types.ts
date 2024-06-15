export type SetFilterUpdaterFn = (prevFilter: string) => string

export type SetFilterFn = (updater: SetFilterUpdaterFn | string) => void
