import Link from 'next/link'
import { Clock3 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function formatDate(value?: string | null) {
  if (!value) return 'Recent'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recent'
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('sbm', 12, { allowMockFallback: true, fresh: true })
  const featured = posts[0]
  const topRow = posts.slice(1, 5)
  const latest = posts.slice(0, 6)
  const popular = posts.slice(6, 10)

  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-[#dbdbdb] bg-white">
            <div className="border-b border-[#eeeeee] px-6 py-4">
              <span className="inline-block bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Featured Bookmark</span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">
                {featured?.title || 'Curated resources that save time and improve discovery'}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#666]">
                <Clock3 className="h-4 w-4" />
                <span>{formatDate(featured?.publishedAt || featured?.createdAt)}</span>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-base leading-8 text-[#444]">
                {featured?.summary || 'Discover hand-picked tools, articles, and references organized for quick action. Build collections, share links, and keep your best findings in one place.'}
              </p>
              <Link href={featured ? `/sbm/${featured.slug}` : '/sbm'} className="mt-5 inline-flex rounded-none bg-[#f5bc08] px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-[#dca703]">
                Read More
              </Link>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Latest Post</h2>
              <ul className="mt-4 space-y-3 text-base text-[#4a4a4a]">
                {latest.map((post) => (
                  <li key={post.id}>
                    <Link href={`/sbm/${post.slug}`} className="hover:text-[#d37800]">{`>> ${post.title}`}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Categories</h2>
              <ul className="mt-4 space-y-2 text-base text-[#4a4a4a]">
                {['Technology', 'Marketing', 'Business Tools', 'Design', 'Startups', 'Productivity'].map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="mt-7 grid gap-5 md:grid-cols-4">
          {topRow.map((post) => (
            <Link key={post.id} href={`/sbm/${post.slug}`} className="border border-[#dbdbdb] bg-white p-4 transition hover:-translate-y-0.5">
              <p className="text-xs font-bold uppercase tracking-wide text-[#7f7f7f]">Social Bookmarking</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-[#252525]">{post.title}</h3>
              <p className="mt-2 text-sm text-[#666]">{formatDate(post.publishedAt || post.createdAt)}</p>
            </Link>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-[#dbdbdb] bg-white p-6">
            <h2 className="text-4xl font-extrabold leading-tight text-[#1f1f1f]">Build Your Own Bookmark Library with Better Organization</h2>
            <p className="mt-4 text-base leading-8 text-[#444]">
              {SITE_CONFIG.name} helps users save important references, organize links by topic, and return to useful content without searching from scratch every time.
            </p>
            <p className="mt-4 text-base leading-8 text-[#444]">
              Create collections for research, growth, design, and operations. Each bookmark remains searchable and easy to revisit, making your workflow faster.
            </p>
            <p className="mt-4 text-base leading-8 text-[#444]">
              Whether you are a founder, marketer, student, or creator, this platform gives you a clean and focused bookmarking experience.
            </p>
            <Link href="/sbm/submit" className="mt-5 inline-flex rounded-none bg-[#2f2f32] px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-[#1f1f22]">
              Submit a Bookmark
            </Link>
          </article>

          <aside className="space-y-5">
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Popular Posts</h2>
              <ul className="mt-4 space-y-3 text-base text-[#4a4a4a]">
                {popular.map((post) => (
                  <li key={post.id}>
                    <Link href={`/sbm/${post.slug}`} className="hover:text-[#d37800]">{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}
