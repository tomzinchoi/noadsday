import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Head from 'next/head'

import Header from '@/components/Header'
import ResourcesSection from '@/components/ResourcesSection'
import Footer from '@/components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ResourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set up page animations
    const ctx = gsap.context(() => {
      // Animation setup specific to this page
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Head>
        <title>Resources & References | National No-Ads Day</title>
        <meta name="description" content="Explore books, studies, articles and statistics about advertising's impact on attention and digital wellbeing." />
      </Head>
      
      <div ref={pageRef} className="min-h-screen">
        <Header />
        
        {/* Hero Banner */}
        <section className="pt-32 pb-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Resources & References
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90">
              Essential research and verified sources on advertising's impact on attention
            </p>
          </div>
        </section>
        
        {/* Main content */}
        <ResourcesSection />
        
        {/* Research methodology section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8 gradient-text">About Our Research</h2>
              
              <div className="space-y-8">
                <div className="bg-light p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Sources & Methodology</h3>
                  <p className="text-dark/80 mb-4">
                    The information presented on National No-Ads Day draws from multiple credible sources including:
                  </p>
                  <ul className="list-disc list-inside text-dark/70 space-y-2">
                    <li>Peer-reviewed academic research from cognitive psychology and neuroscience</li>
                    <li>Reports from established industry sources like Statista and Nielsen</li>
                    <li>Books and publications by recognized experts in digital wellbeing</li>
                    <li>Studies on attention economics and digital media consumption</li>
                  </ul>
                </div>
                
                <div className="bg-light p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Notes on Ad Exposure Data</h3>
                  <p className="text-dark/80 mb-4">
                    The often-cited figure of 4,000-10,000 daily ad exposures represents a range across different research methodologies and definitions of what constitutes an "ad impression." Personal media habits, use of ad-blocking technology, and geographic location significantly impact individual ad exposure rates.
                  </p>
                  <p className="text-dark/80">
                    We strive to present this information with appropriate context and acknowledge the ongoing debates around precise measurement of advertising exposure in today's complex media landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  )
}
