'use client'

import { useState } from 'react'
import { Share2, Check, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CopyLinkButtonProps {
  url: string
  className?: string
}

export function CopyLinkButton({ url, className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`gap-2 ${className}`}
      onClick={handleCopy}
    >
      {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      {copied ? 'Copied!' : 'Curated Link'}
    </Button>
  )
}
