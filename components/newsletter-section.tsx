'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus('success')
    setEmail('')

    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section ref={ref} className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="newsletter-pattern" patternUnits="userSpaceOnUse" width="80" height="80">
              <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="6" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#newsletter-pattern)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-[10%] w-20 h-20 opacity-20"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,0 100,50 50,100 0,50" fill="white" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-[15%] w-16 h-16 opacity-20"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,0 100,50 50,100 0,50" fill="white" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <Send className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Bergabung dengan Keluarga MARBAS
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground/80 mb-8"
          >
            Dapatkan akses eksklusif ke koleksi terbaru, penawaran spesial, 
            dan cerita di balik setiap produk kami.
          </motion.p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all disabled:opacity-50"
              />
            </div>
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 h-auto font-medium"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : status === 'success' ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Berhasil!
                </>
              ) : (
                'Berlangganan'
              )}
            </Button>
          </motion.form>

          {/* Success Message */}
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-primary-foreground/80 text-sm"
            >
              Terima kasih telah berlangganan! Cek email Anda untuk konfirmasi.
            </motion.p>
          )}

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-6 text-xs text-primary-foreground/60"
          >
            Dengan berlangganan, Anda menyetujui kebijakan privasi kami. 
            Kami tidak akan pernah membagikan email Anda kepada pihak ketiga.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
