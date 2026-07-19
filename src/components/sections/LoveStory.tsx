'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface Story {
  id: string
  title: string
  description: string
  year: string
}

interface LoveStoryProps {
  stories: Story[]
  background?: string | null
}

export default function LoveStory({ stories, background }: LoveStoryProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">Our Journey</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4 text-glare">Love Story</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto">
          {stories.length === 0 ? (
            <p className="text-sm text-warm-white/40 text-center py-8">Belum ada cerita.</p>
          ) : (
            <div className="space-y-8">
              {stories.map((story, index) => (
                <ScrollReveal key={story.id} delay={index * 100}>
                  <div className="glass-card rounded-xl p-6 md:p-8">
                    <div className="flex gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                          <span className="font-display text-2xl text-primary text-glare">{story.year}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl text-warm-white mb-2 text-glare">{story.title}</h3>
                        <p className="text-sm text-warm-white/70 leading-relaxed">{story.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}