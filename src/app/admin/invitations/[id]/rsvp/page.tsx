'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getRSVPs, deleteRSVP } from '@/services/invitation'
import { Heart, ArrowLeft, Trash2, Users, CheckCircle, XCircle, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface RSVP {
  id: string
  name: string
  phone: string | null
  status: 'hadir' | 'tidak_hadir' | 'ragu'
  total_guests: number
  message: string | null
  created_at: string
}

export default function RSVPManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'hadir' | 'tidak_hadir' | 'ragu'>('all')

  useEffect(() => {
    const init = async () => {
      const { id: invitationId } = await params
      setId(invitationId)
      try {
        const user = await getCurrentUser()
        if (!user) { router.push('/admin/login'); return }
        const data = await getRSVPs(invitationId)
        setRsvps((data as RSVP[]) || [])
      } catch {
        router.push('/admin/dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [params, router])

  const handleDelete = async (rsvpId: string) => {
    if (!confirm('Hapus RSVP ini?')) return
    try {
      await deleteRSVP(rsvpId)
      setRsvps(rsvps.filter((r) => r.id !== rsvpId))
    } catch (error) {
      console.error('Error deleting RSVP:', error)
    }
  }

  const filteredRsvps = filter === 'all' ? rsvps : rsvps.filter((r) => r.status === filter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hadir': return <CheckCircle size={16} className="text-green-400" />
      case 'tidak_hadir': return <XCircle size={16} className="text-red-400" />
      case 'ragu': return <HelpCircle size={16} className="text-yellow-400" />
      default: return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'hadir': return 'Hadir'
      case 'tidak_hadir': return 'Tidak Hadir'
      case 'ragu': return 'Masih Ragu'
      default: return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/admin/invitations/${id}`} className="text-charcoal/30 hover:text-charcoal/70">
              <ArrowLeft size={20} />
            </Link>
            <Heart size={20} className="text-primary" />
            <span className="font-serif text-lg text-charcoal">Kelola RSVP</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5">
            <Users size={20} className="text-primary mb-2" />
            <p className="text-2xl font-serif text-charcoal">{rsvps.length}</p>
            <p className="text-xs text-charcoal/50">Total RSVP</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5">
            <CheckCircle size={20} className="text-green-400 mb-2" />
            <p className="text-2xl font-serif text-charcoal">{rsvps.filter((r) => r.status === 'hadir').length}</p>
            <p className="text-xs text-charcoal/50">Hadir</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5">
            <XCircle size={20} className="text-red-400 mb-2" />
            <p className="text-2xl font-serif text-charcoal">{rsvps.filter((r) => r.status === 'tidak_hadir').length}</p>
            <p className="text-xs text-charcoal/50">Tidak Hadir</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5">
            <HelpCircle size={20} className="text-yellow-400 mb-2" />
            <p className="text-2xl font-serif text-charcoal">{rsvps.filter((r) => r.status === 'ragu').length}</p>
            <p className="text-xs text-charcoal/50">Masih Ragu</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-xs ${filter === 'all' ? 'bg-primary text-charcoal' : 'bg-white text-charcoal/60'}`}>Semua</button>
          <button onClick={() => setFilter('hadir')} className={`px-4 py-2 rounded-full text-xs ${filter === 'hadir' ? 'bg-primary text-charcoal' : 'bg-white text-charcoal/60'}`}>Hadir</button>
          <button onClick={() => setFilter('tidak_hadir')} className={`px-4 py-2 rounded-full text-xs ${filter === 'tidak_hadir' ? 'bg-primary text-charcoal' : 'bg-white text-charcoal/60'}`}>Tidak Hadir</button>
          <button onClick={() => setFilter('ragu')} className={`px-4 py-2 rounded-full text-xs ${filter === 'ragu' ? 'bg-primary text-charcoal' : 'bg-white text-charcoal/60'}`}>Ragu</button>
        </div>

        {/* RSVP List */}
        <div className="space-y-3">
          {filteredRsvps.length === 0 ? (
            <div className="text-center py-16">
              <Users size={32} className="text-primary/30 mx-auto mb-4" />
              <p className="text-sm text-charcoal/40">Belum ada RSVP</p>
            </div>
          ) : (
            filteredRsvps.map((rsvp, index) => (
              <div key={rsvp.id} className="bg-white p-5 rounded-xl shadow-sm border border-primary/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-base text-charcoal">{rsvp.name}</h3>
                      {getStatusIcon(rsvp.status)}
                      <span className="text-xs text-charcoal/50">{getStatusLabel(rsvp.status)}</span>
                    </div>
                    <div className="space-y-1 text-xs text-charcoal/60">
                      {rsvp.phone && <p>WhatsApp: {rsvp.phone}</p>}
                      <p>Jumlah Tamu: {rsvp.total_guests}</p>
                      {rsvp.message && <p className="italic">"{rsvp.message}"</p>}
                      <p className="text-charcoal/40">{new Date(rsvp.created_at).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(rsvp.id)} className="p-2 text-charcoal/30 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}