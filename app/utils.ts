import type { Dispatch, SetStateAction } from 'react'
import type { AxiosError } from 'axios'
import type { ToastOptions } from 'react-hot-toast'

export function changeFormDataFactory<T>(setFormData: Dispatch<SetStateAction<T>>) {
  return (key: keyof T, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }))
  }
}

type ToastFn = ((message: string, opts?: ToastOptions) => string) & { remove: (toastId?: string) => void }

export function onMutationError(error: AxiosError, toast: ToastFn) {
  const err = error as { response: { data: { errors: { [key: string]: string[] } } } }
  const errors = err?.response?.data?.errors

  if (errors) {
    toast.remove()

    Object.keys(errors).forEach((field) => {
      errors[field].map((errMsg) => {
        toast(errMsg, { icon: '😠', duration: 10000 })
      })
    })
  } else {
    toast('Something went wrong.', { icon: '😠', duration: 6000 })
  }
}

export function limitLength(string: string, maxLength: number) {
  return string.length < maxLength ? string : `${string.slice(0, maxLength)}...`
}
