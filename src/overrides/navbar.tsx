'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const mainLinks = [
  { label: 'HOME', href: '/' },
  { label: 'BOOKMARKS', href: '/sbm' },
  { label: 'COLLECTIONS', href: '/sbm/collections' },
  { label: 'SUBMIT LINK', href: '/sbm/submit' },
]

const utilityLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Contact Us', href: '/contact' },
]

export function NavbarOverride() {
  const [isOpen, setIsOpen] = useState(false)
  const [todayLabel, setTodayLabel] = useState('')
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    setTodayLabel(new Date().toLocaleString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-[#d5d5d5] bg-[#ededed] text-[#232323]">
      <div className="mx-auto hidden max-w-5xl items-center justify-between px-4 py-2 text-xs md:flex">
        <span>{todayLabel || 'Today'}</span>
        <div className="flex items-center gap-3">
          {utilityLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#d37800]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-[34px] font-extrabold tracking-[-0.03em] text-[#dd6c00]">
          {SITE_CONFIG.name}
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-[#575757]">Hi, {user?.name || 'User'}</span>
              <Button asChild size="sm" className="h-9 rounded-none bg-[#2f2f32] px-4 text-white hover:bg-[#1f1f22]">
                <Link href="/sbm/collections">My Collections</Link>
              </Button>
              <Button size="sm" variant="outline" className="h-9 rounded-none border-[#2f2f32] px-4 text-[#2f2f32]" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="sm" variant="outline" className="h-9 rounded-none border-[#2f2f32] px-4 text-[#2f2f32]">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="h-9 rounded-none bg-[#2f2f32] px-4 text-white hover:bg-[#1f1f22]">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="border-y border-[#d89f0f] bg-[#f5bc08]">
        <nav className="mx-auto hidden h-12 max-w-5xl items-center md:flex">
          {mainLinks.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex h-full items-center px-6 text-sm font-bold text-white transition hover:bg-[#2f2f32]">
              {item.label}
            </Link>
          ))}
          <Link href="/search" className="ml-auto inline-flex h-full w-14 items-center justify-center border-l border-[#ffffff66] text-white transition hover:bg-[#2f2f32]">
            <Search className="h-5 w-5" />
          </Link>
        </nav>

        <div className={cn('mx-auto max-w-5xl px-4 py-3 md:hidden', isOpen ? 'block' : 'hidden')}>
          <div className="grid gap-2">
            {mainLinks.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-sm bg-[#2f2f32] px-3 py-2 text-sm font-semibold text-white" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="rounded-sm border border-[#2f2f32] px-3 py-2 text-sm font-semibold text-[#2f2f32]" onClick={() => setIsOpen(false)}>
              Search
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
