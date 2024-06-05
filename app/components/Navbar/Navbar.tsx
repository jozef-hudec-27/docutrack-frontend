import Link from 'next/link'
import { FileEarmarkPlus, BoxArrowRight } from 'react-bootstrap-icons'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { List } from 'react-bootstrap-icons'

type NavbarProps = {
  big?: boolean
}

function Navbar({ big }: NavbarProps) {
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

          <button type="button" aria-label="Logout" title="Log out" className="navbar__link">
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
            <MenuItem className="navbar__menu-item">New document</MenuItem>
            <MenuItem className="navbar__menu-item">Log out</MenuItem>
          </Menu>
        </div>
      )}
    </nav>
  )
}

export default Navbar
