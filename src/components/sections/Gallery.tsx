'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface GalleryImage {
  id: string
  image_url: string
  caption: string | null
}

interface GalleryProps {
  images: GalleryImage[]
  background?: string | null
}

export default function Gallery({ images, background }: GalleryProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">Memories</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4 text-glare">Gallery</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.length === 0 ? (
            <p className="text-sm text-warm-white/40 text-center py-8 col-span-full">Belum ada foto.</p>
          ) : (
            images.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 50}>
                <div className="relative aspect-square rounded-lg overflow-hidden border border-primary/10 group glass-card">
                  <img
                    src={image.image_url}
                    alt={image.caption || 'Gallery'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <p className="text-xs text-white text-center text-glare-light">{image.caption}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}