'use client'

import { useState, useEffect } from 'react'

interface BackgroundMediaProps {
  src: string | null | undefined
  className?: string
  overlayClassName?: string
  overlayColor?: string
}

export default function BackgroundMedia({ src, className = '', overlayClassName = '', overlayColor = 'bg-black/50' }: BackgroundMediaProps) {
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!src) {
      setMediaType(null)
      return
    }

    // Detect media type from URL
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
    const isVideo = videoExtensions.some(ext => src.toLowerCase().includes(ext)) ||
                    src.includes('youtube.com') ||
                    src.includes('youtu.be') ||
                    src.includes('vimeo.com')

    setMediaType(isVideo ? 'video' : 'image')
    setIsLoaded(false)
  }, [src])

  if (!src || !mediaType) {
    return null
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      {mediaType === 'image' && (
        <>
          <img
            src={src}
            alt="Background"
            className="w-full h-full object-cover"
            onLoad={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
          />
          {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        </>
      )}

      {mediaType === 'video' && (
        <>
          {/* Handle YouTube videos */}
          {src.includes('youtube.com') || src.includes('youtu.be') ? (
            <div className="w-full h-full">
              <iframe
                src={src.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/') + (src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&loop=1&playlist=' + src.split('/').pop() + '&controls=0&showinfo=0&rel=0&modestbranding=1'}
                className="w-full h-full object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Background video"
              />
            </div>
          ) : src.includes('vimeo.com') ? (
            <div className="w-full h-full">
              <iframe
                src={src.replace('vimeo.com/', 'player.vimeo.com/video/') + (src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&loop=1&controls=0'}
                className="w-full h-full object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Background video"
              />
            </div>
          ) : (
            /* Handle direct video files */
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onLoadedData={() => setIsLoaded(true)}
            >
              <source src={src} type="video/mp4" />
            </video>
          )}
        </>
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor} ${overlayClassName}`} />
    </div>
  )
}