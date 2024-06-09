'use client'

import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FileEarmarkPlus, BoxArrowRight } from 'react-bootstrap-icons'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { List } from 'react-bootstrap-icons'
import { toast } from 'react-hot-toast'

import api from '../../api/axios-instance'

type NavbarProps = {
  big?: boolean
}

function Navbar({ big }: NavbarProps) {
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await api(true).post('/logout')
    },
    onError: () => {
      toast.remove()
      toast('Error logging out.', { icon: '😠', duration: 6000 })
    },
    onSuccess: () => {
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    },
  })

  function logOut() {
    logoutMutation.mutate()
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

          <button
            type="button"
            aria-label="Logout"
            title="Log out"
            className="navbar__link disabled:cursor-wait"
            onClick={logOut}
            disabled={logoutMutation.isPending || logoutMutation.isSuccess}
          >
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
            <MenuItem
              className="navbar__menu-item"
              onClick={() => {
                if (logoutMutation.isPending || logoutMutation.isSuccess) {
                  return
                }

                logOut()
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </div>
      )}
    </nav>
  )
}

export default Navbar
