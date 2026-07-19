'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface VideoProps {
  videoUrl: string | null
  background?: string | null
}

export default function Video({ videoUrl, background }: VideoProps) {
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

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1`
  }

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4 text-glare-light">Moments</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 text-glare">Video</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        {videoUrl && (
          <ScrollReveal variant="scale">
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg glass-card">
                {getYouTubeEmbedUrl(videoUrl) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(videoUrl)!}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Wedding Video"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster={background || undefined}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}