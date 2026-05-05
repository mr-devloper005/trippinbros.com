'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Footer } from '@/components/shared/footer'
import type { Bookmark as BookmarkType } from '@/types'

interface SbmDetailPageProps {
  bookmark: BookmarkType
}

export function SbmDetailPage({ bookmark }: SbmDetailPageProps) {
  const handleVisitLink = () => {
    if (bookmark.url && bookmark.url !== "#") {
      window.open(bookmark.url, '_blank', 'noopener,noreferrer')
    } else {
      // Show a message that no valid URL is available
      alert("No valid URL available for this bookmark")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Prominent Centered Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {bookmark.title}
            </h1>
          </div>

          {/* Description Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {bookmark.description}
            </p>

            {/* External Link */}
            <div className="pt-4 border-t border-gray-100">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                <span>{bookmark.title}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="mt-8 text-center">
            <Link
              href="/sbm"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Bookmarks
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
