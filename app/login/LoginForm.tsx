'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import api from '../api/axios-instance'
import useUserStore from '../state/user-store'

import type { ComponentPropsWithRef, FormEvent } from 'react'
import type { AxiosError } from 'axios'
import type { LoginFormState } from '../types/form-types'

function LoginForm() {
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  })

  const fetchUser = useUserStore((state) => state.fetchUser)

  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormState) => {
      return await api().post('/login', data)
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
      const authToken = data.data
      localStorage.setItem('auth-token', authToken)
      fetchUser()
      router.replace('/')
    },
  })

  function changeFormData(key: keyof LoginFormState, value: string) {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }))
  }

  const inputFields: ComponentPropsWithRef<'input'>[] = [
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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    loginMutation.mutate(formData)
  }

  return (
    <div className="w-full sm:w-[432px] px-[32px] sm:px-0">
      <form className="flex flex-col gap-[24px]" onSubmit={onSubmit}>
        <div className="flex flex-col gap-[16px]">
          {inputFields.map((field) => (
            <input {...field} key={field.placeholder} />
          ))}
        </div>

        <div className="flex items-center gap-[16px]">
          <button type="submit" className="btn btn--primary disabled:cursor-wait" disabled={loginMutation.isPending}>
            Log In
          </button>

          <Link
            href="/register"
            onClick={(e) => {
              if (loginMutation.isPending) {
                e.preventDefault()
              }
            }}
          >
            Don't have an account yet?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
