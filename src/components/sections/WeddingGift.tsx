'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Gift, Copy, Check, ChevronDown } from 'lucide-react'

interface GiftItem {
  id: string
  bank_name: string
  account_name: string
  account_number: string
}

interface WeddingGiftProps {
  gifts: GiftItem[]
}

export default function WeddingGift({ gifts }: WeddingGiftProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleCopy = async (gift: GiftItem) => {
    try {
      await navigator.clipboard.writeText(gift.account_number)
      setCopiedId(gift.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = gift.account_number
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedId(gift.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  if (!gifts || gifts.length === 0) return null

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-cream">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Wedding Gift</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Tanda Kasih</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <Gift size={32} className="text-primary mx-auto mb-4" />
              <p className="text-sm text-charcoal/60 leading-relaxed">
                Doa restu dan kehadiran Bapak/Ibu/Saudara/i sudah menjadi hadiah yang sangat berarti bagi kami. Namun jika ingin memberikan tanda kasih, dapat melalui:
              </p>
            </div>
          </ScrollReveal>

          {/* Bank accounts */}
          <div className="space-y-4">
            {gifts.map((gift, index) => (
              <ScrollReveal key={gift.id} delay={index * 150}>
                <div className="bg-warm-white p-6 rounded-xl shadow-sm border border-primary/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs tracking-[0.2em] text-primary uppercase font-medium">
                        {gift.bank_name}
                      </p>
                      <p className="text-sm text-charcoal/70 mt-1">{gift.account_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-cream rounded-lg p-3">
                    <span className="font-mono text-sm text-charcoal tracking-wider">
                      {gift.account_number}
                    </span>
                    <button
                      onClick={() => handleCopy(gift)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary hover:text-primary-dark transition-colors"
                    >
                      {copiedId === gift.id ? (
                        <>
                          <Check size={14} />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Salin
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* QRIS placeholder */}
          <ScrollReveal delay={300}>
            <div className="mt-8 text-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
              >
                Atau kirim hadiah fisik?
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-6 bg-warm-white rounded-xl shadow-sm border border-primary/5">
                      <p className="text-sm text-charcoal/60">
                        Silakan hubungi kami untuk informasi pengiriman hadiah fisik.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}