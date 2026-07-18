'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'

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
    <section
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#faf8f5' }
      }
    >
      {background && <div className="absolute inset-0 bg-black/50" />}
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Love Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Kisah Kami</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>
        <div className="max-w-3xl mx-auto">
          {stories.map((story, index) => (
            <ScrollReveal key={story.id} delay={index * 150}>
              <div className="relative pl-8 pb-12 border-l border-primary/20 last:pb-0">
                <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-primary" />
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-primary/5 ml-4">
                  <span className="text-xs tracking-[0.2em] text-primary/60 uppercase">{story.year}</span>
                  <h3 className="font-serif text-lg text-charcoal mt-1 mb-2">{story.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{story.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}