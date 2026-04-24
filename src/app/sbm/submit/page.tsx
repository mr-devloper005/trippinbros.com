'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FolderPlus, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockBookmarks } from '@/data/mock-data'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import type { Bookmark as BookmarkType } from '@/types'

export default function SubmitBookmarkPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const categoryOptions = useMemo(
    () => Array.from(new Set(mockBookmarks.map((bookmark) => bookmark.category))),
    []
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to submit a bookmark.',
      })
      router.push('/login')
      return
    }

    if (!url || !title || !description) {
      setStatusMessage('Please complete the required fields before submitting.')
      return
    }

    let domain = 'link'
    try {
      const parsed = new URL(url)
      domain = parsed.hostname.replace('www.', '')
    } catch {
      setStatusMessage('Please enter a valid URL.')
      return
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const nextBookmark: BookmarkType = {
      id: `user-bookmark-${Date.now()}`,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 60),
      url,
      description,
      image: '/placeholder.svg?height=720&width=1280',
      domain,
      tags: tags.length > 0 ? tags : ['New'],
      category: category || 'General',
      createdAt: new Date().toISOString(),
      author: user,
      upvotes: 0,
      saves: 0,
      commentsCount: 0,
      isUpvoted: false,
      isSaved: false,
    }

    const stored = loadFromStorage<BookmarkType[]>(storageKeys.bookmarks, [])
    const next = [nextBookmark, ...stored]
    saveToStorage(storageKeys.bookmarks, next)

    setStatusMessage('Bookmark submitted! It will appear in your feed.')
    toast({
      title: 'Bookmark submitted',
      description: 'Your link has been added to the feed.',
    })
    setUrl('')
    setTitle('')
    setDescription('')
    setCategory('')
    setTagsInput('')
  }

  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-[#dbdbdb] bg-white p-6">
            <span className="inline-flex items-center gap-2 bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              <Sparkles className="h-3.5 w-3.5" /> Submit Link
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">Share a Useful Link With the Community</h1>
            <p className="mt-4 text-base leading-8 text-[#444]">
              Add your best resources with clear titles, clean descriptions, and focused categories so others can discover value quickly.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="h-10 rounded-none bg-[#2f2f32] px-5 text-sm font-bold uppercase text-white hover:bg-[#1f1f22]">
                <Link href="/sbm/collections">
                  <FolderPlus className="mr-2 h-4 w-4" /> Open Collections
                </Link>
              </Button>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Submission Tips</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#4d4d4d]">
                <li>- Keep titles short and clear.</li>
                <li>- Explain the main takeaway in 1-2 lines.</li>
                <li>- Use 3 to 5 tags for discoverability.</li>
                <li>- Choose the closest category for better sorting.</li>
              </ul>
            </div>
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Suggested Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {['AI', 'Design', 'Productivity', 'Marketing', 'Research', 'Startup'].map((tag) => (
                  <Badge key={tag} className="rounded-none bg-[#f0f0f0] px-2 py-1 text-xs font-semibold text-[#484848] hover:bg-[#e2e2e2]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 border border-[#dbdbdb] bg-white p-6">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold text-[#222]">URL</label>
              <Input
                placeholder="https://example.com"
                className="mt-2 rounded-none border-[#d1d1d1] bg-white"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#222]">Title</label>
              <Input
                placeholder="Give this link a clear title"
                className="mt-2 rounded-none border-[#d1d1d1] bg-white"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#222]">Description</label>
              <Textarea
                placeholder="What makes this link useful?"
                className="mt-2 min-h-[140px] rounded-none border-[#d1d1d1] bg-white"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#222]">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2 rounded-none border-[#d1d1d1] bg-white">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((categoryOption) => (
                    <SelectItem key={categoryOption} value={categoryOption}>
                      {categoryOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#222]">Tags</label>
              <Input
                placeholder="Comma separated tags (example: ai, design, tools)"
                className="mt-2 rounded-none border-[#d1d1d1] bg-white"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" className="h-10 rounded-none bg-[#f5bc08] px-5 text-sm font-bold uppercase text-white hover:bg-[#dca703]">Submit Bookmark</Button>
              <Button
                type="button"
                className="h-10 rounded-none bg-[#2f2f32] px-5 text-sm font-bold uppercase text-white hover:bg-[#1f1f22]"
                onClick={() => {
                  setStatusMessage('Draft saved locally.')
                  toast({
                    title: 'Draft saved',
                    description: 'Your bookmark draft is saved on this device.',
                  })
                }}
              >
                Save Draft
              </Button>
            </div>

            {statusMessage ? <p className="text-sm font-medium text-[#4c4c4c]">{statusMessage}</p> : null}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}
