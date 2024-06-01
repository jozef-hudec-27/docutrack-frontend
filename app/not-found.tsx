'use client'

import { useRouter } from 'next/navigation'

function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-[32px] px-[16px]">
        <h1 className="gradient-text text-center">😭 Oops, page not found...</h1>

        <button className="btn btn--primary" onClick={() => router.replace('/')}>
          Go home
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
