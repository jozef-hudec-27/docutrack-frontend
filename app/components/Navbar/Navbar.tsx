'use client'

import { usePathname } from 'next/navigation'

function Navbar() {
  const pathname = usePathname()

  const showBigNavbar = pathname.includes('/register') || pathname.includes('/login')

  return (
    <nav className={`navbar ${showBigNavbar ? 'navbar--big' : 'navbar--small'}`}>
      <p className="text-4xl sm:text-5xl font-bold text-black-100 cursor-default">🔎 DocuTrack</p>
    </nav>
  )
}

export default Navbar
