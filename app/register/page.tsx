'use client'

import withGuest from '../hoc/with-guest'
import FormPage from '../components/FormPage'
import RegisterForm from './RegisterForm'

function RegisterPage() {
  return (
    <FormPage heading="Register">
      <RegisterForm />
    </FormPage>
  )
}

export default withGuest(RegisterPage)
