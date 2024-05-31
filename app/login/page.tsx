import LoginForm from './LoginForm'

function LoginPage() {
  return (
    <div>
      <section className="flex justify-center mt-[96px]">
        <div className="flex flex-col items-center gap-[32px] w-full">
          <h1 className="self-center">Log In</h1>

          <LoginForm />
        </div>
      </section>
    </div>
  )
}

export default LoginPage
