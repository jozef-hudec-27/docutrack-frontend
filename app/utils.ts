import type { Dispatch, SetStateAction } from 'react'

export function changeFormDataFactory<T>(setFormData: Dispatch<SetStateAction<T>>) {
  return (key: keyof T, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }))
  }
}
