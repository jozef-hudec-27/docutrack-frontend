import Link from 'next/link'

function NotFoundPage() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-[32px] px-[16px]">
        <h1 className="gradient-text text-center">😭 Oops, page not found...</h1>

        <Link className="btn btn--primary no-underline flex justify-center" href="/">
          Go home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
