'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Copy, Check } from 'lucide-react'

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

function GiftCard({ gift }: { gift: Gift }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(gift.account_number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 rounded-xl bg-warm-white/90 backdrop-blur-sm shadow-sm border border-primary/5 text-center">
      <h3 className="font-display text-lg text-charcoal mb-2">{gift.bank_name}</h3>
      <p className="text-xs text-charcoal/60 mb-3">a.n. {gift.account_name}</p>
      <div className="flex items-center justify-center gap-2">
        <span className="font-mono text-sm text-charcoal">{gift.account_number}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      {copied && <p className="text-[10px] text-primary mt-1">Tersalin!</p>}
    </div>
  )
}

export default function WeddingGift({ gifts, background }: WeddingGiftProps) {
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
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Wedding Gift</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Tanda Kasih</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
            <p className="text-sm text-charcoal/40 mt-4 max-w-md mx-auto">
              Doa restu Anda merupakan hadiah terindah. Namun jika ingin memberi tanda kasih, dapat melalui:
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
          {gifts.map((gift, index) => (
            <ScrollReveal key={gift.id} delay={index * 150}>
              <GiftCard gift={gift} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}