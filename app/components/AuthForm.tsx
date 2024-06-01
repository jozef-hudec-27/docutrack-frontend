import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import api from '../api/axios-instance'
import useUserStore from '../state/user-store'

import type { ComponentPropsWithRef, Dispatch, FormEvent, MutableRefObject, ReactNode, SetStateAction } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { LoginFormState, RegisterFormState } from '../types/form-types'

type AuthFormProps = {
  submitText: string
  generateLink: (mutation: UseMutationResult, ref: MutableRefObject<HTMLInputElement>) => ReactNode
} & (
  | {
      formType: 'login'
      formData: LoginFormState
      setFormData: Dispatch<SetStateAction<LoginFormState>>
    }
  | {
      formType: 'register'
      formData: RegisterFormState
      setFormData: Dispatch<SetStateAction<RegisterFormState>>
      changeStep: (ref: MutableRefObject<HTMLInputElement>) => void
      filterInputs: (inputs: ComponentPropsWithRef<'input'>[]) => ComponentPropsWithRef<'input'>[]
    }
)

function AuthForm(props: AuthFormProps) {
  const { formType, formData, setFormData, submitText, generateLink } = props

  const passwordInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const fetchUser = useUserStore((state) => state.fetchUser)

  const mutation = useMutation({
    mutationFn: async (data: LoginFormState | RegisterFormState) => {
      return await api().post(
        `/${formType}`,
        formType === 'login'
          ? data
          : {
              // @ts-ignore
              name: data.name,
              email: data.email,
              password: data.password,
              // @ts-ignore
              password_confirmation: data.passwordConfirmation,
            }
      )
    },
    onError: (error: AxiosError) => {
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
    },
    onSuccess: (data) => {
      if (formType === 'login') {
        const authToken = data.data
        localStorage.setItem('auth-token', authToken)
        fetchUser()
        router.replace('/')
      } else {
        router.replace('/login')
        toast("You've successfully registered! You can now log in.", { icon: '🎉', duration: 6000 })
      }
    },
  })

  function changeFormData(key: keyof LoginFormState | keyof RegisterFormState, value: string) {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }))
  }

  const inputFields: ComponentPropsWithRef<'input'>[] =
    formType === 'login'
      ? [
          {
            type: 'email',
            className: 'input input--big',
            id: 'input-email',
            placeholder: 'Email',
            'aria-label': 'Email',
            autoComplete: 'email',
            value: formData.email,
            onChange: (e) => changeFormData('email', e.target.value),
            required: true,
            autoFocus: true,
          },
          {
            type: 'password',
            className: 'input input--big',
            id: 'input-password',
            placeholder: 'Password',
            'aria-label': 'Password',
            autoComplete: 'current-password',
            value: formData.password,
            onChange: (e) => changeFormData('password', e.target.value),
            required: true,
          },
        ]
      : [
          {
            type: 'text',
            className: 'input input--big',
            id: 'input-name',
            placeholder: 'Name',
            'aria-label': 'Name',
            autoComplete: 'name',
            value: formData.name,
            onChange: (e) => changeFormData('name', e.target.value),
            ref: nameInputRef,
            required: true,
            autoFocus: true,
          },
          {
            type: 'email',
            className: 'input input--big',
            id: 'input-email',
            placeholder: 'Email',
            'aria-label': 'Email',
            autoComplete: 'email',
            value: formData.email,
            onChange: (e) => changeFormData('email', e.target.value),
            required: true,
          },
          {
            type: 'password',
            className: 'input input--big',
            id: 'input-password',
            placeholder: 'Password',
            'aria-label': 'Password',
            autoComplete: 'new-password',
            value: formData.password,
            onChange: (e) => changeFormData('password', e.target.value),
            ref: passwordInputRef,
            required: true,
          },
          {
            type: 'password',
            className: 'input input--big',
            id: 'input-password_confirmation',
            placeholder: 'Confirm Password',
            'aria-label': 'Confirm Password',
            autoComplete: 'new-password',
            value: formData.passwordConfirmation,
            onChange: (e) => changeFormData('passwordConfirmation', e.target.value),
            required: true,
          },
        ]

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (formType === 'register') {
      try {
        props.changeStep(passwordInputRef)
      } catch {
        return
      }
    }

    mutation.mutate(formData)
  }

  const inputs = formType === 'login' ? inputFields : props.filterInputs(inputFields)

  return (
    <div className="w-full sm:w-[432px] px-[32px] sm:px-0">
      <form className="flex flex-col gap-[24px]" onSubmit={onSubmit}>
        <div className="flex flex-col gap-[16px]">
          {inputs.map((field) => (
            <input {...field} key={field.placeholder} />
          ))}
        </div>

        <div className="flex items-center gap-[16px]">
          <button type="submit" className="btn btn--primary disabled:cursor-wait" disabled={mutation.isPending}>
            {submitText}
          </button>

          {generateLink(mutation, nameInputRef)}
        </div>
      </form>
    </div>
  )
}

export default AuthForm
