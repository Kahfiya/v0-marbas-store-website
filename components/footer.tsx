'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Mail, ChevronUp } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'Parfume', href: '#products' },
    { name: 'Wearable', href: '#products' },
    { name: 'Tech', href: '#products' },
    { name: 'Best Sellers', href: '#products' },
    { name: 'New Arrivals', href: '#products' },
  ],
  company: [
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Karir', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  support: [
    { name: 'FAQ', href: '#' },
    { name: 'Pengiriman', href: '#' },
    { name: 'Pengembalian', href: '#' },
    { name: 'Hubungi Kami', href: '#contact' },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/marbas.official?igsh=MXVmbXRsdTR1cndycw==' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:kahfiyanurgunami@gmail.com' },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background relative">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>

      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 
              className="text-3xl font-bold tracking-wider mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              MARBAS
            </h2>
            <p className="text-background/70 mb-6 max-w-sm">
              Membawa warisan Nusantara ke era modern melalui produk berkualitas 
              yang menggabungkan tradisi dan inovasi.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Belanja</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Bantuan</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-background/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-background/50 text-sm">
            <span>Metode Pembayaran:</span>
            <div className="flex items-center gap-4">
              {['BCA', 'Mandiri', 'GoPay', 'OVO', 'DANA'].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 bg-background/10 rounded text-xs"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p>
              © {currentYear} MARBAS. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-background transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="flex justify-center mt-12">
          <svg width="100" height="30" viewBox="0 0 100 30" className="text-background/20">
            <path d="M0 15 L15 0 L30 15 L45 0 L55 15 L70 0 L85 15 L100 0" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </footer>
  )
}
