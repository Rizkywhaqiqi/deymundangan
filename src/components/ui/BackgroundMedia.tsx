'use client'

import { useState, useEffect } from 'react'

interface BackgroundMediaProps {
  url: string | null | undefined
  className?: string
  overlayClassName?: string
}

export default function BackgroundMedia({ url, className = '', overlayClassName = '' }: BackgroundMediaProps) {
  const [isVideo, setIsVideo] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (!url) {
      setIsVideo(false)
      return
    }

    // Check if URL is a video
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
    const isVideoUrl = videoExtensions.some(ext => url.toLowerCase().includes(ext))

    // Also check if it's a direct video URL from common hosting
    const isVideoHosting = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')

    setIsVideo(isVideoUrl || isVideoHosting)
  }, [url])

  if (!url) return null

  // Handle YouTube URLs
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const getYouTubeEmbedUrl = (url: string) => {
      let videoId = ''

      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
      } else if (url.includes('youtube.com/watch')) {
        const match = url.match(/[?&]v=([^&]+)/)
        videoId = match?.[1] || ''
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('youtube.com/embed/')[1]?.split('?')[0] || ''
      }

      if (!videoId) return null

      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
    }

    const embedUrl = getYouTubeEmbedUrl(url)

    if (!embedUrl) return null

    return (
      <div className={`absolute inset-0 ${className}`}>
        <iframe
          src={embedUrl}
          className="w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video Background"
        />
        <div className={`absolute inset-0 bg-black/40 ${overlayClassName}`} />
      </div>
    )
  }

  // Handle Vimeo URLs
  if (url.includes('vimeo.com')) {
    const getVimeoEmbedUrl = (url: string) => {
      const match = url.match(/vimeo\.com\/(\d+)/)
      const videoId = match?.[1] || ''
      if (!videoId) return null
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&mute=1&loop=1&background=1&controls=0`
    }

    const embedUrl = getVimeoEmbedUrl(url)

    if (!embedUrl) return null

    return (
      <div className={`absolute inset-0 ${className}`}>
        <iframe
          src={embedUrl}
          className="w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video Background"
        />
        <div className={`absolute inset-0 bg-black/40 ${overlayClassName}`} />
      </div>
    )
  }

  // Handle direct video files
  if (isVideo && !videoError) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src={url} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 bg-black/40 ${overlayClassName}`} />
      </div>
    )
  }

  // Fallback to image
  return (
    <div
      className={`absolute inset-0 bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${url})` }}
    >
      <div className={`absolute inset-0 bg-black/40 ${overlayClassName}`} />
    </div>
  )
}