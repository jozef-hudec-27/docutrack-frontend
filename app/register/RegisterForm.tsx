import { useRef, useState } from 'react'
import Link from 'next/link'

import type { InputHTMLAttributes } from 'react'

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

  function changeFormData(key: keyof RegisterFormState, value: string) {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }))
  }

  const inputFields: InputHTMLAttributes<HTMLInputElement>[] = [
    {
      type: 'text',
      className: 'input input--big w-[432px]',
      placeholder: 'Name',
      'aria-label': 'Name',
      autoComplete: 'name',
      value: formData.name,
      onChange: (e) => changeFormData('name', e.target.value),
      // @ts-ignore
      ref: nameInputRef,
      required: true,
      autoFocus: true,
    },
    {
      type: 'email',
      className: 'input input--big w-[432px]',
      placeholder: 'Email',
      'aria-label': 'Email',
      autoComplete: 'email',
      value: formData.email,
      onChange: (e) => changeFormData('email', e.target.value),
      required: true,
    },
    {
      type: 'password',
      className: 'input input--big w-[432px]',
      placeholder: 'Password',
      'aria-label': 'Password',
      autoComplete: 'new-password',
      value: formData.password,
      onChange: (e) => changeFormData('password', e.target.value),
      // @ts-ignore
      ref: passwordInputRef,
      required: true,
    },
    {
      type: 'password',
      className: 'input input--big w-[432px]',
      placeholder: 'Confirm Password',
      'aria-label': 'Confirm Password',
      autoComplete: 'new-password',
      value: formData.passwordConfirmation,
      onChange: (e) => changeFormData('passwordConfirmation', e.target.value),
      required: true,
    },
  ]

  return (
    <div>
      {' '}
      <form
        className="flex flex-col gap-[24px]"
        onSubmit={(e) => {
          e.preventDefault()

          if (step === 1) {
            setStep(2)

            setTimeout(() => {
              passwordInputRef.current?.focus()
            }, 0)
          } else {
            console.log('submit', formData)
          }
        }}
      >
        <div className="flex flex-col gap-[16px]">
          {inputFields.slice(step === 1 ? 0 : 2, step === 1 ? 2 : 4).map((field) => {
            return <input {...field} />
          })}
        </div>

        <div className="flex items-center gap-[16px]">
          <button type="submit" className="btn btn--primary">
            {step === 1 ? 'Continue' : 'Register'}
          </button>

          {step === 1 ? (
            <Link href="">Already have an account?</Link>
          ) : (
            <a
              href=""
              onClick={(e) => {
                e.preventDefault()

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
