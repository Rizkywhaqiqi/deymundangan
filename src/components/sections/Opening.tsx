'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  left: string
  top: string
  duration: number
  delay: number
}

interface OpeningProps {
  groomName: string
  brideName: string
  weddingDate: string
  onOpen: () => void
}

export default function Opening({ groomName, brideName, weddingDate, onOpen }: OpeningProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate random positions only on client to avoid hydration mismatch
    const generated = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setParticles(generated)
  }, [])

  const handleOpen = () => {
    setIsVisible(false)
    setTimeout(onOpen, 800)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 via-transparent to-rose/5 blur-3xl" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-rose/5 via-transparent to-primary/5 blur-3xl" />
          </div>

          {/* Floating particles - rendered only on client */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: p.left,
                top: p.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}

          <div className="relative z-10 text-center px-6">
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
            />

            {/* The Wedding Of */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm tracking-[0.3em] text-primary/80 uppercase font-light mb-6"
            >
              The Wedding Of
            </motion.p>

            {/* Names */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white mb-2 leading-tight"
            >
              {groomName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center justify-center gap-4 my-4"
            >
              <div className="w-12 h-[1px] bg-primary/60" />
              <span className="font-display text-2xl text-primary">&</span>
              <div className="w-12 h-[1px] bg-primary/60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white mb-8 leading-tight"
            >
              {brideName}
            </motion.h1>

            {/* Date */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-sm tracking-[0.2em] text-warm-white/60 uppercase mb-12"
            >
              {weddingDate}
            </motion.p>

            {/* Open Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="group relative px-10 py-3 overflow-hidden rounded-full border border-primary/50 text-primary text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-primary hover:text-charcoal hover:border-primary"
            >
              <span className="relative z-10">Buka Undangan</span>
              <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.button>

            {/* Scroll indicator */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="mt-8 text-xs tracking-[0.2em] text-warm-white/30"
            >
              — Scroll untuk membuka —
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}