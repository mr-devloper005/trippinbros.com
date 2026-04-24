import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect account data, bookmarks you submit, collection metadata, and basic usage analytics to improve the service.',
  },
  {
    title: '2. How We Use Information',
    body: 'Your data helps us personalize feed quality, improve search relevance, and maintain platform safety and performance.',
  },
  {
    title: '3. Local Browser Storage',
    body: 'Certain features store user data in your browser local storage for faster access and session continuity.',
  },
  {
    title: '4. Data Security',
    body: 'We apply reasonable safeguards, but no system is absolutely secure. Keep your account credentials protected.',
  },
  {
    title: '5. Your Choices',
    body: 'You can manage and remove locally stored data from your browser settings and contact us for account-related requests.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="border border-[#dbdbdb] bg-white p-6">
          <span className="inline-flex bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Privacy Policy</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">How We Protect Your Data</h1>
          <p className="mt-4 text-base leading-8 text-[#444]">
            This policy explains what data we collect, how we use it, and what control you have over your information.
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
