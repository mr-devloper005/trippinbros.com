import { Mail, MessageSquare, Phone, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const supportLanes = [
  {
    title: 'General Support',
    body: 'Questions about using bookmarks, collections, and submitting links.',
    icon: MessageSquare,
  },
  {
    title: 'Partnerships',
    body: 'Collaboration requests, curated campaigns, and resource partnerships.',
    icon: Sparkles,
  },
  {
    title: 'Account Help',
    body: 'Login issues, profile concerns, and data-related requests.',
    icon: Mail,
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-[#dbdbdb] bg-white p-6">
            <span className="inline-flex bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Contact Us</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">Get in Touch With {SITE_CONFIG.name}</h1>
            <p className="mt-4 text-base leading-8 text-[#444]">
              Reach out for support, feedback, or collaboration. We usually respond within one business day.
            </p>
            <div className="mt-5 space-y-3 text-sm text-[#444]">
              <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> support@{SITE_CONFIG.domain}</p>
              <p className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 010-2048</p>
            </div>
          </article>

          <aside className="space-y-5">
            {supportLanes.map((lane) => (
              <div key={lane.title} className="border border-[#dbdbdb] bg-white p-5">
                <div className="inline-flex h-8 w-8 items-center justify-center bg-[#f5bc08] text-white">
                  <lane.icon className="h-4 w-4" />
                </div>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#1f1f1f]">{lane.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4a4a4a]">{lane.body}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="mt-8 border border-[#dbdbdb] bg-white p-6">
          <h2 className="text-3xl font-extrabold leading-tight text-[#1f1f1f]">Send a Message</h2>
          <form className="mt-5 grid gap-4">
            <input className="h-11 border border-[#d1d1d1] px-3 text-sm outline-none focus:border-[#f5bc08]" placeholder="Your name" />
            <input className="h-11 border border-[#d1d1d1] px-3 text-sm outline-none focus:border-[#f5bc08]" placeholder="Email address" />
            <input className="h-11 border border-[#d1d1d1] px-3 text-sm outline-none focus:border-[#f5bc08]" placeholder="Subject" />
            <textarea className="min-h-[170px] border border-[#d1d1d1] px-3 py-3 text-sm outline-none focus:border-[#f5bc08]" placeholder="Write your message here..." />
            <button type="submit" className="h-11 bg-[#2f2f32] px-4 text-sm font-bold uppercase text-white hover:bg-[#1f1f22]">Send Message</button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}
