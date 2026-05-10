'use client'

import { LoadingScreen } from '@/components/loading-screen'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CollectionsSection } from '@/components/collections-section'
import { ProductsSection } from '@/components/products-section'
import { FeaturedSection } from '@/components/featured-section'
import { AboutSection } from '@/components/about-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { NewsletterSection } from '@/components/newsletter-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgress } from '@/components/scroll-progress'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <CartDrawer />
      
      <main>
        <HeroSection />
        <CollectionsSection />
        <ProductsSection />
        <FeaturedSection />
        <AboutSection />
        <TestimonialsSection />
        <NewsletterSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
