'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/loading-screen'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CollectionsSection } from '@/components/collections-section'
import { ProductsSection } from '@/components/products-section'
import { FeaturedSection } from '@/components/featured-section'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Header onSearch={setSearchQuery} />
      <CartDrawer />
      <WhatsAppFloat />
      
      <main>
        <HeroSection />
        <CollectionsSection />
        <ProductsSection searchQuery={searchQuery} />
        <FeaturedSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
