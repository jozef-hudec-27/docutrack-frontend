import { useState } from 'react'
import Link from 'next/link'

import AuthForm from '../components/AuthForm'

import type { LoginFormState } from '../types/form-types'

function LoginForm() {
  const [formData, setFormData] = useState<LoginFormState>({ email: '', password: '' })

  return (
    <AuthForm
      submitText="Log In"
      formType="login"
      formData={formData}
      setFormData={setFormData}
      generateLink={(loginMutation) => (
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
      )}
    />
  )
}

export default LoginForm
