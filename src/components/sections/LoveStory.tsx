'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'

interface StoryItem {
  id: string
  title: string
  description: string
  year: string
}

interface LoveStoryProps {
  stories: StoryItem[]
}

export default function LoveStory({ stories }: LoveStoryProps) {
  if (!stories || stories.length === 0) return null

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-cream">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Love Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Kisah Cinta</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 md:-translate-x-px" />

          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-1.5 z-10 shadow-[0_0_0_4px_rgba(201,169,110,0.2)]" />

              {/* Content */}
              <ScrollReveal
                variant={index % 2 === 0 ? 'left' : 'right'}
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <div className="bg-warm-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/5">
                  <span className="inline-block text-xs tracking-[0.2em] text-primary uppercase mb-2 font-medium">
                    {story.year}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-charcoal mb-3">
                    {story.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}