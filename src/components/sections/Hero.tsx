'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface HeroProps {
  groomName: string
  brideName: string
  weddingDate: string
  venueName: string
}

export default function Hero({ groomName, brideName, weddingDate, venueName }: HeroProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-warm-white"
    >
      {/* Background ornament */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl">
          <svg viewBox="0 0 800 800" className="w-full h-full opacity-[0.03]">
            <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 py-20">
        {/* Decorative top */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isVisible ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-0.5 h-16 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mb-10"
        />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-6"
        >
          Undangan Pernikahan
        </motion.p>

        {/* Names */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white mb-2 leading-tight"
        >
          {groomName}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center justify-center gap-4 my-6"
        >
          <div className="w-16 h-[1px] bg-primary/40" />
          <span className="font-display text-3xl text-primary">&</span>
          <div className="w-16 h-[1px] bg-primary/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white mb-8 leading-tight"
        >
          {brideName}
        </motion.h2>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="space-y-2"
        >
          <p className="text-sm tracking-[0.2em] text-warm-white/60 uppercase">{weddingDate}</p>
          <p className="text-xs tracking-[0.15em] text-warm-white/40 uppercase">{venueName}</p>
        </motion.div>

        {/* Decorative bottom */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isVisible ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="w-0.5 h-16 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mt-10"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 mx-auto border border-warm-white/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-warm-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}