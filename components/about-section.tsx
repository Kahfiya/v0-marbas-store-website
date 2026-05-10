'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Award, Leaf, Shield, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Kualitas Premium',
    description: 'Setiap produk melalui proses quality control ketat untuk memastikan standar tertinggi',
  },
  {
    icon: Leaf,
    title: 'Ramah Lingkungan',
    description: 'Menggunakan bahan-bahan sustainable dan kemasan yang dapat didaur ulang',
  },
  {
    icon: Shield,
    title: 'Garansi Asli',
    description: 'Jaminan keaslian 100% dengan sertifikat untuk setiap pembelian',
  },
  {
    icon: Sparkles,
    title: 'Desain Eksklusif',
    description: 'Kolaborasi dengan pengrajin lokal untuk menciptakan produk unik',
  },
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} id="about" className="py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative z-10">
              <motion.div
                style={{ y }}
                className="aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=800&fit=crop"
                  alt="MARBAS Craftsmanship"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </motion.div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl shadow-xl max-w-[200px]"
              >
                <div className="text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  2019
                </div>
                <p className="text-sm text-muted-foreground">
                  Didirikan dengan visi membawa warisan Nusantara ke dunia
                </p>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-10 -left-10 w-40 h-40 opacity-20"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 10" />
              </svg>
            </motion.div>

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 translate-x-8 translate-y-8">
              <div className="w-full h-full rounded-2xl border-2 border-dashed border-primary/20" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-primary">Tentang Kami</span>
            </motion.div>

            {/* Title */}
            <h2 
              className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Membawa <span className="text-primary">Warisan</span> ke Era Modern
            </h2>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              MARBAS lahir dari kecintaan mendalam terhadap kekayaan budaya Nusantara. 
              Kami percaya bahwa tradisi dan modernitas dapat berjalan beriringan, 
              menciptakan produk yang tidak hanya indah tetapi juga bermakna.
            </p>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Setiap produk yang kami hadirkan adalah hasil kolaborasi dengan pengrajin 
              lokal berbakat, memastikan setiap detail mencerminkan warisan yang kami 
              junjung tinggi sambil tetap relevan dengan gaya hidup masa kini.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-10 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10"
            >
              <blockquote className="text-foreground italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                &ldquo;Misi kami adalah menjadi jembatan antara warisan leluhur dan 
                generasi masa depan, satu produk berkualitas pada satu waktu.&rdquo;
              </blockquote>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">MARBAS Team</p>
                  <p className="text-xs text-muted-foreground">Founder & Creative Director</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
