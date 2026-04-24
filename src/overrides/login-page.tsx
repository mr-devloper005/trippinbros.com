'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    try {
      await login(email, password)
      router.push('/sbm/collections')
    } catch {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="border border-[#dbdbdb] bg-white p-6">
            <h1 className="text-4xl font-extrabold leading-tight text-[#1f1f1f]">Member Login</h1>
            <p className="mt-4 text-base leading-8 text-[#454545]">
              Sign in to access your saved bookmarks, create collections, and manage your curated links.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#5d5d5d]">
              <li>- Access personal bookmark collections</li>
              <li>- Save links directly from bookmark pages</li>
              <li>- Keep resources synced in local browser storage</li>
            </ul>
          </aside>

          <div className="border border-[#dbdbdb] bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-[#7a7a7a]">Welcome Back</p>
            <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 border border-[#d1d1d1] px-3 text-sm outline-none focus:border-[#f5bc08]"
                placeholder="Email address"
                type="email"
              />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 border border-[#d1d1d1] px-3 text-sm outline-none focus:border-[#f5bc08]"
                placeholder="Password"
                type="password"
              />
              {error ? <p className="text-sm font-medium text-[#b42323]">{error}</p> : null}
              <button type="submit" disabled={isLoading} className="h-11 bg-[#2f2f32] px-4 text-sm font-bold uppercase text-white hover:bg-[#1f1f22] disabled:opacity-60">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <div className="mt-5 flex items-center justify-between text-sm text-[#585858]">
              <Link href="/forgot-password" className="hover:text-[#d37800]">Forgot password?</Link>
              <Link href="/register" className="font-semibold hover:text-[#d37800]">Create account</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
