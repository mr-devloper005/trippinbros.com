'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { FolderOpen, FolderPlus, LayoutGrid, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { BookmarkCollectionCard } from '@/components/sbm/bookmark-collection-card'
import type { BookmarkCollection } from '@/types'
import { loadFromStorage, storageKeys } from '@/lib/local-storage'

export default function BookmarkCollectionsPage() {
  const [storedCollections, setStoredCollections] = useState<BookmarkCollection[]>([])
  const collections = useMemo(() => storedCollections, [storedCollections])

  useEffect(() => {
    setStoredCollections(loadFromStorage<BookmarkCollection[]>(storageKeys.bookmarkCollections, []))
  }, [])

  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-[#dbdbdb] bg-white p-6">
            <span className="inline-flex items-center gap-2 bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              <FolderOpen className="h-3.5 w-3.5" /> Collections
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">Organize Your Saved Links Into Smart Collections</h1>
            <p className="mt-4 text-base leading-8 text-[#444]">
              Build clean topic folders for your best bookmarks. Group resources by workflow, client, niche, or learning goals.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="h-10 rounded-none bg-[#f5bc08] px-5 text-sm font-bold uppercase text-white hover:bg-[#dca703]">
                <Link href="/sbm/collections/new">
                  <FolderPlus className="mr-2 h-4 w-4" /> New Collection
                </Link>
              </Button>
              <Button asChild className="h-10 rounded-none bg-[#2f2f32] px-5 text-sm font-bold uppercase text-white hover:bg-[#1f1f22]">
                <Link href="/sbm/submit">Add Bookmark</Link>
              </Button>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Collection Stats</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border border-[#ececec] p-3">
                  <p className="text-xs font-bold uppercase text-[#7b7b7b]">Total</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#1f1f1f]">{collections.length}</p>
                </div>
                <div className="border border-[#ececec] p-3">
                  <p className="text-xs font-bold uppercase text-[#7b7b7b]">Local Saved</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#1f1f1f]">{storedCollections.length}</p>
                </div>
              </div>
            </div>
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Quick Tips</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#4d4d4d]">
                <li className="inline-flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-[#d37800]" /> Keep one clear goal per collection.</li>
                <li className="inline-flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-[#d37800]" /> Use short names that are easy to scan.</li>
                <li className="inline-flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-[#d37800]" /> Archive old links monthly.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#777]">
            <LayoutGrid className="h-4 w-4" /> Collection Library
          </div>
          {collections.length === 0 ? (
            <div className="border border-[#dbdbdb] bg-white p-6">
              <h3 className="text-2xl font-extrabold leading-tight text-[#1f1f1f]">No collections yet</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a4a4a]">
                Start by creating your first collection to organize bookmarks by topic or workflow.
              </p>
              <Button asChild className="mt-4 h-10 rounded-none bg-[#f5bc08] px-5 text-sm font-bold uppercase text-white hover:bg-[#dca703]">
                <Link href="/sbm/collections/new">
                  <FolderPlus className="mr-2 h-4 w-4" /> Create First Collection
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <div key={collection.id} className="border border-[#dbdbdb] bg-white p-1">
                  <BookmarkCollectionCard collection={collection} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
