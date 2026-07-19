'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface ClosingProps {
  groomName: string
  brideName: string
  background?: string | null
}

export default function Closing({ groomName, brideName, background }: ClosingProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-12 h-[1px] bg-primary mx-auto mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-6 text-glare-light">Terima Kasih</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6 text-glare">
              {groomName} & {brideName}
            </h2>
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-md mx-auto">
              Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu kepada kami.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="mt-12 space-y-2">
              <p className="font-display text-3xl text-primary text-glare">Terima Kasih</p>
              <p className="text-xs tracking-[0.2em] text-charcoal/40 uppercase text-glare-light">
                Wassalamu'alaikum Warahmatullahi Wabarakatuh
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="mt-16">
              <div className="w-16 h-[1px] bg-primary mx-auto mb-4" />
              <p className="text-xs text-charcoal/30 text-glare-light">
                — Wedding Invitation —
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}