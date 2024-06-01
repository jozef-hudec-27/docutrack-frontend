import Navbar from './Navbar/Navbar'

import type { ReactNode } from 'react'

type FormPageProps = {
  heading: string
  children: ReactNode
}

function FormPage({ heading, children }: FormPageProps) {
  return (
    <>
      <Navbar big />

      <div>
        <section className="flex justify-center mt-[96px]">
          <div className="flex flex-col items-center gap-[32px] w-full">
            <h1 className="self-center">{heading}</h1>

            {children}
          </div>
        </section>
      </div>
    </>
  )
}

export default FormPage
