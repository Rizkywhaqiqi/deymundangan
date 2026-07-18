'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'

interface BrideGroomProps {
  groomName: string
  groomNickname: string
  groomFather: string
  groomMother: string
  groomChildOrder: string
  brideName: string
  brideNickname: string
  brideFather: string
  brideMother: string
  brideChildOrder: string
}

export default function BrideGroom({
  groomName,
  groomNickname,
  groomFather,
  groomMother,
  groomChildOrder,
  brideName,
  brideNickname,
  brideFather,
  brideMother,
  brideChildOrder,
}: BrideGroomProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-warm-white">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Bride & Groom</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Kedua Mempelai</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-20 max-w-5xl mx-auto">
          {/* Groom */}
          <ScrollReveal variant="left">
            <div className="text-center">
              {/* Avatar placeholder */}
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden bg-cream border-2 border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-primary/30">
                    {groomName.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">{groomName}</h3>
              <p className="text-sm text-primary/80 tracking-[0.2em] uppercase mb-4">
                {groomNickname}
              </p>

              <div className="gold-line w-12 mx-auto mb-4" />

              <p className="text-sm text-charcoal/60 leading-relaxed">
                Putra {groomChildOrder} dari
              </p>
              <p className="text-sm text-charcoal/80 font-medium mt-1">
                Bapak {groomFather}
              </p>
              <p className="text-sm text-charcoal/60 font-light">
                & Ibu {groomMother}
              </p>
            </div>
          </ScrollReveal>

          {/* Bride */}
          <ScrollReveal variant="right" delay={200}>
            <div className="text-center">
              {/* Avatar placeholder */}
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden bg-cream border-2 border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-primary/30">
                    {brideName.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">{brideName}</h3>
              <p className="text-sm text-primary/80 tracking-[0.2em] uppercase mb-4">
                {brideNickname}
              </p>

              <div className="gold-line w-12 mx-auto mb-4" />

              <p className="text-sm text-charcoal/60 leading-relaxed">
                Putri {brideChildOrder} dari
              </p>
              <p className="text-sm text-charcoal/80 font-medium mt-1">
                Bapak {brideFather}
              </p>
              <p className="text-sm text-charcoal/60 font-light">
                & Ibu {brideMother}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}