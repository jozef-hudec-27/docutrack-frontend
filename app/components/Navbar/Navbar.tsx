'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileEarmarkPlus, BoxArrowRight } from 'react-bootstrap-icons'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { List } from 'react-bootstrap-icons'

type NavbarProps = {
  big?: boolean
}

function Navbar({ big }: NavbarProps) {
  const router = useRouter()

  function logOut() {
    localStorage.removeItem('auth-token')
    window.location.href = '/login'
  }

  return (
    <nav className={`navbar ${big ? 'navbar--big' : 'navbar--small'}`}>
      <Link href="/" className="text-4xl sm:text-5xl font-bold text-black-100 no-underline whitespace-nowrap">
        🔎 DocuTrack
      </Link>

      {!big && (
        <div className="flex items-center gap-[32px]">
          <Link href="/documents/new" aria-label="New document" title="New document" className="navbar__link">
            <FileEarmarkPlus size={24} />
          </Link>

          <button type="button" aria-label="Logout" title="Log out" className="navbar__link" onClick={logOut}>
            <BoxArrowRight size={24} />
          </button>

          <Menu
            menuClassName="navbar__menu"
            menuButton={
              <MenuButton className="navbar__menu-btn" aria-label="Menu">
                <List size={24} />
              </MenuButton>
            }
          >
            <MenuItem
              className="navbar__menu-item"
              onClick={(e) => {
                e.syntheticEvent.preventDefault()

                router.push('/documents/new')
              }}
            >
              New document
            </MenuItem>
            <MenuItem className="navbar__menu-item" onClick={logOut}>
              Log out
            </MenuItem>
          </Menu>
        </div>
      )}
    </nav>
  )
}

export default Navbar
