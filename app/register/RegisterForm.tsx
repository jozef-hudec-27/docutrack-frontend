'use client'

import { useState } from 'react'
import Link from 'next/link'

import AuthForm from '../components/AuthForm'

import type { RegisterFormState } from '../types/form-types'

function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [step, setStep] = useState<1 | 2>(1)

  return (
    <AuthForm
      submitText={step === 1 ? 'Continue' : 'Register'}
      formType="register"
      formData={formData}
      setFormData={setFormData}
      changeStep={(passwordInputRef) => {
        if (step === 1) {
          setStep(2)

          setTimeout(() => {
            passwordInputRef.current?.focus()
          }, 0)

          throw new Error()
        }
      }}
      filterInputs={(inputFields) => inputFields.slice(step === 1 ? 0 : 2, step === 1 ? 2 : 4)}
      generateLink={(registerMutation, nameInputRef) =>
        step === 1 ? (
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
        )
      }
    />
  )
}

export default RegisterForm
