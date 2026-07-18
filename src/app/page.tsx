'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-warm-white">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">
            Wedding Invitation Premium
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-warm-white mb-4">
            Undangan Pernikahan
          </h1>
          <div className="w-16 h-[1px] bg-primary mx-auto mb-6" />
          <p className="text-sm text-warm-white/40 max-w-md mx-auto mb-8">
            Platform undangan pernikahan digital premium dengan pengalaman interaktif yang mewah dan berkesan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/admin/login"
            className="px-8 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors"
          >
            Admin Login
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex items-center justify-center gap-2 text-xs text-warm-white/20"
        >
          Made with <Heart size={12} className="text-primary" /> for love
        </motion.div>
      </div>
    </main>
  )
}