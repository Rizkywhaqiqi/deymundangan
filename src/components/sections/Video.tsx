'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { Play } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoProps {
  videoUrl: string | null
  background?: string | null
}

export default function Video({ videoUrl, background }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!videoUrl) return null

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null
  }

  const embedUrl = getYoutubeEmbedUrl(videoUrl)

  return (
    <section
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#0a0a0a' }
      }
    >
      {background && <div className="absolute inset-0 bg-black/60" />}
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Video</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4">Video Prewedding</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal variant="scale">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-charcoal/50 group cursor-pointer">
              {!isPlaying ? (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm"
                  >
                    <Play size={32} className="text-charcoal ml-1" />
                  </motion.div>
                </button>
              ) : null}

              {embedUrl && isPlaying ? (
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-charcoal/30 to-charcoal/60" />
                  <span className="font-display text-3xl text-white/10">▶</span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}