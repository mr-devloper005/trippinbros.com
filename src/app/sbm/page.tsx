import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock3, FolderOpen, Link2, TrendingUp } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { fetchTaskPosts } from '@/lib/task-data'

export const revalidate = 3

export const generateMetadata = (): Metadata =>
  buildTaskMetadata('sbm', {
    path: '/sbm',
    title: taskPageMetadata.sbm.title,
    description: taskPageMetadata.sbm.description,
  })

function formatDate(value?: string | null) {
  if (!value) return 'Recent'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recent'
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function SocialBookmarkingPage({ searchParams }: { searchParams?: { category?: string } }) {
  const posts = await fetchTaskPosts('sbm', 24, { allowMockFallback: true, fresh: true })
  const featured = posts[0]
  const feed = posts.slice(1)
  const category = searchParams?.category?.trim() || 'all'

  const filtered = category === 'all'
    ? feed
    : feed.filter((post) => (post.content as Record<string, unknown> | undefined)?.category === category)

  const categories = Array.from(
    new Set(
      posts
        .map((post) => (post.content as Record<string, unknown> | undefined)?.category)
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    )
  )

  const popular = posts.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="border border-[#dbdbdb] bg-white">
            <div className="border-b border-[#eeeeee] px-6 py-4">
              <span className="inline-block bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Bookmark Feed</span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">
                {featured?.title || 'Curated resources for smarter daily work'}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#666]">
                <Clock3 className="h-4 w-4" />
                <span>{formatDate(featured?.publishedAt || featured?.createdAt)}</span>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-base leading-8 text-[#444]">
                {featured?.summary || 'Browse a clean feed of quality links shared by the community. Save what matters, skip noise, and revisit faster.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={featured ? `/sbm/${featured.slug}` : '/sbm'} className="inline-flex rounded-none bg-[#f5bc08] px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-[#dca703]">
                  Read Feature
                </Link>
                <Link href="/sbm/submit" className="inline-flex rounded-none bg-[#2f2f32] px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-[#1f1f22]">
                  Submit Link
                </Link>
              </div>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Filter by Category</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/sbm" className={`inline-flex rounded-none border px-3 py-1.5 text-sm font-semibold ${category === 'all' ? 'border-[#2f2f32] bg-[#2f2f32] text-white' : 'border-[#d3d3d3] text-[#4f4f4f]'}`}>
                  All
                </Link>
                {categories.map((item) => (
                  <Link key={item} href={`/sbm?category=${encodeURIComponent(item)}`} className={`inline-flex rounded-none border px-3 py-1.5 text-sm font-semibold ${category === item ? 'border-[#2f2f32] bg-[#2f2f32] text-white' : 'border-[#d3d3d3] text-[#4f4f4f]'}`}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>

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

        <section className="mt-8 space-y-4">
          {filtered.map((post, index) => (
            <article key={post.id} className="border border-[#dbdbdb] bg-white p-5">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#777]">
                <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> Resource #{index + 1}</span>
                <span className="inline-flex items-center gap-1"><FolderOpen className="h-3.5 w-3.5" /> {(post.content as Record<string, unknown> | undefined)?.category || 'General'}</span>
                <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight text-[#1f1f1f]">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a4a4a]">{post.summary || 'Open this bookmark for a clear breakdown and quick access to the original source.'}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={`/sbm/${post.slug}`} className="inline-flex rounded-none bg-[#2f2f32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f1f22]">
                  Open Bookmark
                </Link>
                <span className="inline-flex items-center gap-1 text-sm text-[#6c6c6c]"><Link2 className="h-4 w-4" /> curated link</span>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}
