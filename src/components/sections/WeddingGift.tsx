'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface Gift {
  id: string
  bank_name: string
  account_name: string
  account_number: string
}

interface WeddingGiftProps {
  gifts: Gift[]
  background?: string | null
}

export default function WeddingGift({ gifts, background }: WeddingGiftProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">Wedding Gift</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4 text-glare">Hadiah Pernikahan</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-2xl mx-auto">
          {gifts.length === 0 ? (
            <p className="text-sm text-warm-white/40 text-center py-8">Belum ada informasi hadiah.</p>
          ) : (
            <div className="grid gap-4">
              {gifts.map((gift, index) => (
                <ScrollReveal key={gift.id} delay={index * 100}>
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="font-serif text-lg text-warm-white mb-3 text-glare">{gift.bank_name}</h3>
                    <div className="space-y-2 text-sm text-warm-white/70">
                      <p>Atas Nama: <span className="font-medium text-warm-white text-glare-light">{gift.account_name}</span></p>
                      <p>No. Rekening: <span className="font-medium text-warm-white text-glare-light">{gift.account_number}</span></p>
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