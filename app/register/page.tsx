'use client'

import RegisterForm from './RegisterForm'

function RegisterPage() {
  return (
    <div>
      <section className="flex justify-center mt-[96px]">
        <div className="flex flex-col gap-[32px]">
          <h1 className="self-center">Register</h1>

          <RegisterForm />
        </div>
      </section>
    </div>
  )
}

export default RegisterPage
