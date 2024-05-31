'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import api from '../api/axios-instance'

import type { ComponentPropsWithRef, FormEvent } from 'react'
import type { AxiosError } from 'axios'
import type { RegisterFormState } from '../types/form-types'

function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const passwordInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormState) => {
      const { name, email, password, passwordConfirmation: password_confirmation } = data
      return await api().post('/register', {
        name,
        email,
        password,
        password_confirmation,
      })
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
    onSuccess: () => {
      router.replace('/login')
      toast("You've successfully registered! You can now log in.", { icon: '🎉', duration: 6000 })
    },
  })

  function changeFormData(key: keyof RegisterFormState, value: string) {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }))
  }

  const inputFields: ComponentPropsWithRef<'input'>[] = [
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

    if (step === 1) {
      setStep(2)

      setTimeout(() => {
        passwordInputRef.current?.focus()
      }, 0)
    } else {
      registerMutation.mutate(formData)
    }
  }

  return (
    <div className="w-full sm:w-[432px] px-[32px] sm:px-0">
      {' '}
      <form className="flex flex-col gap-[24px]" onSubmit={onSubmit}>
        <div className="flex flex-col gap-[16px]">
          {inputFields.slice(step === 1 ? 0 : 2, step === 1 ? 2 : 4).map((field) => {
            return <input {...field} key={field.placeholder} />
          })}
        </div>

        <div className="flex items-center gap-[16px]">
          <button type="submit" className="btn btn--primary disabled:cursor-wait" disabled={registerMutation.isPending}>
            {step === 1 ? 'Continue' : 'Register'}
          </button>

          {step === 1 ? (
            <Link href="/login">Already have an account?</Link>
          ) : (
            <a
              href=""
              onClick={(e) => {
                e.preventDefault()

                if (registerMutation.isPending) {
                  return
                }

                setStep(1)

                setTimeout(() => {
                  nameInputRef.current?.focus()
                }, 0)
              }}
            >
              Go back
            </a>
          )}
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
