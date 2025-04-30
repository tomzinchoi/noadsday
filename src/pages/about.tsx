import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
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
        <title>About National No-Ads Day | September 15</title>
        <meta name="description" content="Learn about National No-Ads Day, a movement to reclaim your attention and experience a day without advertising distractions." />
      </Head>
      
      <div ref={pageRef} className="min-h-screen">
        <Header />
        
        {/* Hero Banner */}
        <section className="pt-32 pb-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              About National No-Ads Day
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90">
              One day of rest, a year of attention
            </p>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Introduction */}
              <div className="prose prose-lg mx-auto mb-12">
                <h2 className="text-3xl font-heading font-bold gradient-text mb-6">The Attention Revolution</h2>
                
                <p className="text-xl leading-relaxed mb-6">
                  Since establishing National No-Ads Day in 2023, our movement has been known for the "notifications off" moment, with individuals from around the globe disconnecting from advertising to show symbolic support for mental wellbeing and to raise awareness of the attention crisis affecting our society.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  More than just a day, National No-Ads Day has evolved into a powerful reminder that our attention is precious. In today's hyper-connected digital landscape, we are now at a tipping point with our attention and mental wellbeing crises, putting at risk our cognitive health and our collective future.
                </p>
                
                {/* Featured Image */}
                <div className="my-12 rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    src="/workspaces/noadsday/public/assets/images/no-ads-day-gathering.jpg" 
                    alt="People enjoying quality time without digital distractions" 
                    width={1200} 
                    height={800}
                    className="w-full h-auto"
                  />
                  <p className="text-sm text-dark/60 italic mt-2 text-center">
                    People reconnecting with meaningful activities during National No-Ads Day
                  </p>
                </div>
                
                <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">Why We Need a Day Without Ads</h2>
                
                <p className="text-lg leading-relaxed mb-6">
                  The average urban resident today is bombarded with 4,000–10,000 ad messages daily. Our digital devices, designed to capture and sell our attention, have transformed from tools of convenience into sources of constant distraction. This unrelenting stream of advertising has profound consequences for our mental health, creativity, and human connections.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  National No-Ads Day invites you to switch off notifications and spend 24 hours experiencing a life free from advertising interruptions. One day might not seem like much, but the transformation happens when your perspective shifts, and you rediscover what it feels like to be fully present—when you, and those like you across the globe, give a day for your mental wellbeing.
                </p>
                
                <div className="bg-light p-6 rounded-xl shadow-sm mb-12">
                  <h3 className="font-bold text-xl mb-4">For the future of our attention, and ourselves</h3>
                  <p className="text-lg leading-relaxed">
                    Humanity is facing twin crises of diminishing attention spans and rising digital fatigue. Research shows that digital interruptions cost us 23 minutes of recovery time for each distraction, while constant connectivity is linked to rising anxiety and reduced deep thinking. The attention economy threatens our cognitive abilities, but we are not past the point of no return. Now, more than ever, National No-Ads Day serves as a beacon of positivity and inspiration—a reminder of the power we still hold over our attention.
                  </p>
                </div>
                
                {/* YouTube Video */}
                <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">The Science of Attention</h2>
                
                <div className="aspect-w-16 aspect-h-9 mb-8">
                  <iframe 
                    className="w-full h-96 rounded-xl shadow-md"
                    src="https://www.youtube.com/embed/H6n3iNh4XLI" 
                    title="The Attention Crisis | Johann Hari" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                <p className="text-sm text-dark/60 italic mb-8 text-center">
                  Johann Hari discusses the attention crisis in modern society
                </p>
                
                <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">How Can You Participate?</h2>
                
                <p className="text-lg leading-relaxed mb-6">
                  National No-Ads Day is calling on individuals, communities, and businesses across the world to switch off ad notifications and give a day for attention, spending 24 hours experiencing a life free from advertising interruptions.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  Whether you're into deep reading, creative pursuits, outdoor adventures, or quality time with loved ones—everyone can participate by disconnecting from ads and reconnecting with what truly matters. Use this day to rediscover activities that bring genuine fulfillment rather than algorithmic satisfaction.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-light p-6 rounded-xl">
                    <h4 className="font-bold text-xl mb-3 text-primary">For Individuals</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Turn off notifications for 24 hours</li>
                      <li>Use ad-blockers on all devices</li>
                      <li>Choose ad-free premium services for the day</li>
                      <li>Engage in offline activities</li>
                      <li>Journal about your experience</li>
                    </ul>
                  </div>
                  
                  <div className="bg-light p-6 rounded-xl">
                    <h4 className="font-bold text-xl mb-3 text-secondary">For Businesses</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Offer ad-free experiences to customers</li>
                      <li>Pause scheduled advertising campaigns</li>
                      <li>Host offline community events</li>
                      <li>Encourage employees to disconnect</li>
                      <li>Develop attention-friendly policies</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Vision & Call to Action */}
              <div className="bg-primary/5 border border-primary/20 p-8 rounded-xl mb-12">
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-lg leading-relaxed mb-6">
                  We envision a world where people have control over their attention, where technology enhances rather than exploits human potential, and where businesses thrive by providing genuine value rather than capturing attention at any cost.
                </p>
                <p className="text-lg leading-relaxed">
                  National No-Ads Day isn't anti-technology or anti-business—it's pro-human. It's about creating a healthier relationship with our digital tools and establishing new norms that respect the precious resource of human attention.
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="text-center">
                <a 
                  href="#footer-join"
                  className="btn btn-primary px-8 py-4 text-lg"
                >
                  Join the Movement
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  )
}
