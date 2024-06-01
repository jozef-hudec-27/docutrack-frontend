'use client'

import withAuth from './hoc/with-auth'
import Navbar from './components/Navbar/Navbar'

function Home() {
  return (
    <>
      <Navbar />

      <div>Logged in</div>
    </>
  )
}

export default withAuth(Home)
