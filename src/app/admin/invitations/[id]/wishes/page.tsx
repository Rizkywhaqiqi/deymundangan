'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getWishes, deleteWish, approveWish } from '@/services/invitation'
import { Heart, ArrowLeft, Trash2, CheckCircle, XCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface Wish {
  id: string
  name: string
  message: string
  is_approved: boolean
  created_at: string
}

export default function WishesManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [wishes, setWishes] = useState<Wish[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all')

  useEffect(() => {
    const init = async () => {
      const { id: invitationId } = await params
      setId(invitationId)
      try {
        const user = await getCurrentUser()
        if (!user) { router.push('/admin/login'); return }
        const data = await getWishes(invitationId)
        setWishes((data as Wish[]) || [])
      } catch {
        router.push('/admin/dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [params, router])

  const handleDelete = async (wishId: string) => {
    if (!confirm('Hapus ucapan ini?')) return
    try {
      await deleteWish(wishId)
      setWishes(wishes.filter((w) => w.id !== wishId))
    } catch (error) {
      console.error('Error deleting wish:', error)
    }
  }

  const handleApprove = async (wishId: string) => {
    try {
      await approveWish(wishId)
      setWishes(wishes.map((w) => w.id === wishId ? { ...w, is_approved: true } : w))
    } catch (error) {
      console.error('Error approving wish:', error)
    }
  }

  const filteredWishes = filter === 'all' ? wishes : wishes.filter((w) => filter === 'approved' ? w.is_approved : !w.is_approved)

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
            <span className="font-serif text-lg text-charcoal">Kelola Ucapan</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5">
            <MessageCircle size={20} className="text-primary mb-2" />
            <p className="text-2xl font-serif text-charcoal">{wishes.length}</p>
            <p className="text-xs text-charcoal/50">Total Ucapan</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5">
            <CheckCircle size={20} className="text-green-400 mb-2" />
            <p className="text-2xl font-serif text-charcoal">{wishes.filter((w) => w.is_approved).length}</p>
            <p className="text-xs text-charcoal/50">Disetujui</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5">
            <XCircle size={20} className="text-yellow-400 mb-2" />
            <p className="text-2xl font-serif text-charcoal">{wishes.filter((w) => !w.is_approved).length}</p>
            <p className="text-xs text-charcoal/50">Menunggu</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-xs ${filter === 'all' ? 'bg-primary text-charcoal' : 'bg-white text-charcoal/60'}`}>Semua</button>
          <button onClick={() => setFilter('approved')} className={`px-4 py-2 rounded-full text-xs ${filter === 'approved' ? 'bg-primary text-charcoal' : 'bg-white text-charcoal/60'}`}>Disetujui</button>
          <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-full text-xs ${filter === 'pending' ? 'bg-primary text-charcoal' : 'bg-white text-charcoal/60'}`}>Menunggu</button>
        </div>

        {/* Wishes List */}
        <div className="space-y-3">
          {filteredWishes.length === 0 ? (
            <div className="text-center py-16">
              <MessageCircle size={32} className="text-primary/30 mx-auto mb-4" />
              <p className="text-sm text-charcoal/40">Belum ada ucapan</p>
            </div>
          ) : (
            filteredWishes.map((wish) => (
              <div key={wish.id} className="bg-white p-5 rounded-xl shadow-sm border border-primary/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-base text-charcoal">{wish.name}</h3>
                      {wish.is_approved ? (
                        <CheckCircle size={16} className="text-green-400" />
                      ) : (
                        <XCircle size={16} className="text-yellow-400" />
                      )}
                      <span className="text-xs text-charcoal/50">{wish.is_approved ? 'Disetujui' : 'Menunggu'}</span>
                    </div>
                    <p className="text-sm text-charcoal/70 mb-2">{wish.message}</p>
                    <p className="text-xs text-charcoal/40">{new Date(wish.created_at).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!wish.is_approved && (
                      <button onClick={() => handleApprove(wish.id)} className="p-2 text-charcoal/30 hover:text-green-500 transition-colors" title="Setujui">
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(wish.id)} className="p-2 text-charcoal/30 hover:text-red-500 transition-colors" title="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}