'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getCurrentUser, signOut, getAllInvitations } from '@/services/invitation'
import { Heart, LogOut, Plus, Edit, ExternalLink, Users } from 'lucide-react'
import Link from 'next/link'

interface Invitation {
  id: string
  slug: string
  groom_name: string
  bride_name: string
  wedding_date: string
  is_published: boolean
  created_at: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push('/admin/login')
          return
        }
        setUser(currentUser)
        const data = await getAllInvitations()
        setInvitations(data as Invitation[])
      } catch {
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
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
      {/* Header */}
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-primary" />
            <span className="font-serif text-lg text-charcoal">Admin Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-charcoal/50">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-xs text-charcoal/40 hover:text-charcoal/70 transition-colors"
            >
              <LogOut size={14} />
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-primary/5"
          >
            <Users size={20} className="text-primary mb-3" />
            <p className="text-2xl font-serif text-charcoal">{invitations.length}</p>
            <p className="text-xs text-charcoal/50 mt-1">Total Undangan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-primary/5"
          >
            <Heart size={20} className="text-primary mb-3" />
            <p className="text-2xl font-serif text-charcoal">
              {invitations.filter((i) => i.is_published).length}
            </p>
            <p className="text-xs text-charcoal/50 mt-1">Dipublikasikan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-primary/5"
          >
            <ExternalLink size={20} className="text-primary mb-3" />
            <p className="text-2xl font-serif text-charcoal">
              {invitations.filter((i) => !i.is_published).length}
            </p>
            <p className="text-xs text-charcoal/50 mt-1">Draft</p>
          </motion.div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-charcoal">Daftar Undangan</h2>
          <Link
            href="/admin/invitations/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-charcoal text-xs tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors"
          >
            <Plus size={16} />
            Undangan Baru
          </Link>
        </div>

        {/* Invitations list */}
        <div className="space-y-3">
          {invitations.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={32} className="text-primary/30 mx-auto mb-4" />
              <p className="text-sm text-charcoal/40">Belum ada undangan</p>
              <Link
                href="/admin/invitations/new"
                className="inline-block mt-4 text-xs text-primary hover:text-primary-dark"
              >
                Buat undangan pertama
              </Link>
            </div>
          ) : (
            invitations.map((invitation, index) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-primary/5 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-serif text-base text-charcoal">
                    {invitation.groom_name} & {invitation.bride_name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-charcoal/40">
                      /{invitation.slug}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        invitation.is_published
                          ? 'bg-green-50 text-green-600'
                          : 'bg-yellow-50 text-yellow-600'
                      }`}
                    >
                      {invitation.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/${invitation.slug}`}
                    target="_blank"
                    className="p-2 text-charcoal/30 hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <Link
                    href={`/admin/invitations/${invitation.id}`}
                    className="p-2 text-charcoal/30 hover:text-primary transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}