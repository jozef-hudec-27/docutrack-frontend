'use client'

import withGuest from '../hoc/with-guest'
import FormPage from '../components/FormPage'
import LoginForm from './LoginForm'

function LoginPage() {
  return (
    <FormPage heading="Log In">
      <LoginForm />
    </FormPage>
  )
}

export default withGuest(LoginPage)
