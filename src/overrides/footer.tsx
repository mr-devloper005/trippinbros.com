import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const categories = ['Technology', 'Marketing', 'Design', 'Startups', 'Productivity', 'Finance']

export function FooterOverride() {
  return (
    <footer className="mt-16 bg-[linear-gradient(90deg,#1f1b1f_0%,#221e23_100%)] text-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="mb-4 border-l-4 border-[#f6c411] pl-3 text-2xl font-bold">{SITE_CONFIG.name}</h3>
          <p className="text-sm leading-7 text-[#dfd9df]">
            A social bookmarking platform to save, organize, and revisit high-quality resources with clarity.
          </p>
        </div>
        <div>
          <h4 className="mb-4 border-l-4 border-[#f6c411] pl-3 text-lg font-bold">Quick Links</h4>
          <ul className="space-y-3 text-sm text-[#dfd9df]">
            <li><Link href="/sbm" className="hover:text-[#f6c411]">Bookmark Feed</Link></li>
            <li><Link href="/sbm/collections" className="hover:text-[#f6c411]">Collections</Link></li>
            <li><Link href="/sbm/submit" className="hover:text-[#f6c411]">Submit Link</Link></li>
            <li><Link href="/login" className="hover:text-[#f6c411]">Member Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 border-l-4 border-[#f6c411] pl-3 text-lg font-bold">Popular Topics</h4>
          <ul className="space-y-3 text-sm text-[#dfd9df]">
            <li>Top AI Tools</li>
            <li>Growth Strategy Reads</li>
            <li>Design Inspiration</li>
            <li>Founder Playbooks</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 border-l-4 border-[#f6c411] pl-3 text-lg font-bold">Categories</h4>
          <ul className="space-y-3 text-sm text-[#dfd9df]">
            {categories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#2f2a30] py-4">
        <p className="mx-auto max-w-5xl px-4 text-sm text-[#ddd6dd]">
          Copyright {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
