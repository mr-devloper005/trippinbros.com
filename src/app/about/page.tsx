import Link from 'next/link'
import { BookMarked, Compass, ShieldCheck, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Links Curated', value: '120K+' },
  { label: 'Collections Created', value: '22K+' },
  { label: 'Active Members', value: '9K+' },
]

const values = [
  {
    title: 'Quality Over Quantity',
    description: 'We focus on meaningful resources that users can trust and reuse.',
  },
  {
    title: 'Organized Discovery',
    description: 'Collections, categories, and tags keep bookmarked knowledge structured.',
  },
  {
    title: 'Community Curation',
    description: 'Members help surface high-value links for everyone to benefit from.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-[#dbdbdb] bg-white p-6">
            <span className="inline-flex items-center gap-2 bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              <Sparkles className="h-3.5 w-3.5" /> About Us
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">{`About ${SITE_CONFIG.name}`}</h1>
            <p className="mt-4 text-base leading-8 text-[#444]">
              {SITE_CONFIG.name} is a social bookmarking platform built for people who want less noise and better research flow. Save links, organize collections, and return to what matters.
            </p>
            <p className="mt-4 text-base leading-8 text-[#444]">
              Our goal is simple: help users build reliable personal knowledge libraries with faster retrieval and cleaner browsing.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex rounded-none bg-[#f5bc08] px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-[#dca703]">Contact Us</Link>
              <Link href="/sbm" className="inline-flex rounded-none bg-[#2f2f32] px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-[#1f1f22]">Open Bookmark Feed</Link>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Platform Snapshot</h2>
              <div className="mt-4 grid gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="border border-[#ececec] p-3">
                    <p className="text-xs font-bold uppercase text-[#7b7b7b]">{item.label}</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#1f1f1f]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((item, index) => (
            <article key={item.title} className="border border-[#dbdbdb] bg-white p-5">
              <div className="inline-flex h-8 w-8 items-center justify-center bg-[#f5bc08] text-white">
                {index === 0 ? <BookMarked className="h-4 w-4" /> : index === 1 ? <Compass className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              </div>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight text-[#1f1f1f]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a4a4a]">{item.description}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
