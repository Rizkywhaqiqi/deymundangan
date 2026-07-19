'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia src={background} overlayColor="bg-black/50" />
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Gallery</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Galeri Foto</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        {images.length === 0 ? (
          <div className="text-center">
            <p className="text-sm text-charcoal/40">Belum ada foto</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {images.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 100}>
                <div className="aspect-[3/4] overflow-hidden rounded-xl cursor-pointer group" onClick={() => setSelectedImage(image.image_url)}>
                  <img src={image.image_url} alt={image.caption || ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-4 right-4 text-white" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <img src={selectedImage} alt="" className="max-w-full max-h-[90vh] object-contain" />
          </div>
        )}
      </div>
    </section>
  )
}