'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Send, Check } from 'lucide-react'

interface RSVPProps {
  invitationId: string
  background?: string | null
}

export default function RSVP({ invitationId, background }: RSVPProps) {
  const [formData, setFormData] = useState({ guest_name: '', phone: '', is_attending: true, total_guests: 1, message: '' })
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const saved = localStorage.getItem(`rsvp_${invitationId}`)
    const existing = saved ? JSON.parse(saved) : []
    const updated = [...existing, { ...formData, id: Date.now(), created_at: new Date().toISOString() }]
    localStorage.setItem(`rsvp_${invitationId}`, JSON.stringify(updated))

    setFormData({ guest_name: '', phone: '', is_attending: true, total_guests: 1, message: '' })
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 4000)
  }

  return (
    <section
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#ffffff' }
      }
    >
      {background && <div className="absolute inset-0 bg-black/50" />}
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">RSVP</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Konfirmasi Kehadiran</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-lg mx-auto">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8 rounded-xl bg-warm-white/90 backdrop-blur-sm shadow-sm border border-primary/5">
              <input type="text" required value={formData.guest_name} onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })} placeholder="Nama Anda" className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm" />
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Nomor WhatsApp" className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm" />
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={formData.is_attending} onChange={() => setFormData({ ...formData, is_attending: true })} className="text-primary" />
                  <span className="text-sm text-charcoal/70">Hadir</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!formData.is_attending} onChange={() => setFormData({ ...formData, is_attending: false })} className="text-primary" />
                  <span className="text-sm text-charcoal/70">Tidak Hadir</span>
                </label>
              </div>
              <input type="number" min={1} max={10} value={formData.total_guests} onChange={(e) => setFormData({ ...formData, total_guests: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm" />
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} placeholder="Pesan (opsional)" className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm resize-none" />
              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50">
                {isSubmitting ? 'Mengirim...' : 'Kirim'}
              </button>
              {isSuccess && (
                <p className="text-xs text-primary text-center flex items-center justify-center gap-1">
                  <Check size={14} /> Konfirmasi terkirim!
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}