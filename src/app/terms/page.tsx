import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: '1. Account Usage',
    body: 'Use your account responsibly. Do not share credentials or attempt unauthorized access to other user data.',
  },
  {
    title: '2. Bookmark Submissions',
    body: 'You are responsible for the links and descriptions you submit. Do not post harmful, misleading, or unlawful content.',
  },
  {
    title: '3. Intellectual Property',
    body: 'You retain ownership of submitted content and grant the platform a license to display, categorize, and distribute it inside the site.',
  },
  {
    title: '4. Community Conduct',
    body: 'Spam, harassment, abuse, and malicious activity are prohibited and may lead to account suspension.',
  },
  {
    title: '5. Service Availability',
    body: 'We work to keep the service reliable, but uptime and uninterrupted access cannot be guaranteed.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="border border-[#dbdbdb] bg-white p-6">
          <span className="inline-flex bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Terms of Service</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">Terms of Service for {SITE_CONFIG.name}</h1>
          <p className="mt-4 text-base leading-8 text-[#444]">
            These terms describe the rules for using our social bookmarking platform. By using this site, you agree to these terms.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#7b7b7b]">Last updated: April 24, 2026</p>
        </section>

        <section className="mt-8 space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="text-2xl font-extrabold leading-tight text-[#1f1f1f]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4a4a4a]">{section.body}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
