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
                <h2 className="text-3xl font-heading font-bold gradient-text mb-6">Why National No-Ads Day?</h2>
                
                <p className="text-xl leading-relaxed mb-6">
                  Every day, we are surrounded by a torrent of advertising—on our phones, in our feeds, on the streets, and even in the palm of our hands. The average city dweller sees between 4,000 and 10,000 ads daily. With so much of our attention captured, it's no wonder that many of us feel mentally fatigued, distracted, and disconnected from the present moment.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  National No-Ads Day is a global movement dedicated to reclaiming our focus, restoring our well-being, and reimagining the relationship between people, media, and brands. By stepping away from ads for just one day, we take a meaningful pause—a digital detox for our minds and a wake-up call for our attention.
                </p>
                <div className="text-lg text-dark/70 leading-relaxed mt-15 mb-15 mr-20 ml-20 text-center">
                <p className="italic mb-2">
                  "Our attention has become a precious resource—protecting it is essential to our well-being."
                </p>
                <p className="text-sm text-dark/70 font-medium">
                  — Katherine Price, Director of Digital Wellness Institute
                </p>
                </div>

                {/* Featured Image */}
                <div className="my-12 rounded-xl overflow-hidden">
                  <Image 
                    src="/assets/images/Nationalnoadsday.png" 
                    alt="National No-Ads Day" 
                    width={1200} 
                    height={800}
                    className="w-full h-auto"
                  />

                </div>
                

                <h2 className="text-3xl font-heading font-bold gradient-text mb-6">The Attention Revolution</h2>
                
                <p className="text-xl leading-relaxed mb-6">
                  Constant exposure to advertising and information overload impacts our lives in profound ways—reducing concentration, increasing stress, and even affecting our sleep and decision-making. Research from Harvard Business Review and the American Psychological Association links digital fatigue to diminished productivity, heightened anxiety, and a decline in cognitive health.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  But there’s another way. National No-Ads Day is an invitation to experience a quieter, more mindful world. It’s a chance to rediscover what it feels like to read a book undisturbed, share a meal without notifications, or walk outside and truly notice your surroundings.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  This day is more than a break—it's a rallying point for a new kind of digital culture, where attention is valued, and both people and businesses thrive by building real, trust-based connections.
                </p>

                <div className="text-lg text-dark/70 leading-relaxed mt-15 mb-15 mr-20 ml-20 text-center">
                <p className="italic mb-2">
                  “Relentless advertising steals the mental rest we need for creativity and deep thought.”
                </p>
                <p className="text-sm text-dark/70 font-medium">
                  — Michael Goldman, Neuroscientist
                </p>
                </div>

                {/* YouTube Video */}
                <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">The Science of Attention</h2>
                
                <div className="aspect-w-16 aspect-h-9 mb-8">
                  <iframe 
                    className="w-full h-96 rounded-xl shadow-md"
                    src="https://www.youtube.com/embed/kNOX7a7-kwQ" 
                    title="The Attention Crisis | Johann Hari" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                <p className="text-sm text-dark/60 italic mb-8 text-center">
                  Johann Hari discusses the attention crisis in modern society
                </p>
                
                
                <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">Why We Need a Day Without Ads</h2>
                
                <p className="text-lg leading-relaxed mb-6">
                  The average urban resident today is bombarded with 4,000–10,000 ad messages daily. Our digital devices, designed to capture and sell our attention, have transformed from tools of convenience into sources of constant distraction. This unrelenting stream of advertising has profound consequences for our mental health, creativity, and human connections.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  National No-Ads Day invites you to switch off notifications and spend 24 hours experiencing a life free from advertising interruptions. One day might not seem like much, but the transformation happens when your perspective shifts, and you rediscover what it feels like to be fully present—when you, and those like you across the globe, give a day for your mental wellbeing.
                </p>

                <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">Be Part of the Change</h2>
                
                <p className="text-lg leading-relaxed mb-6">
                  Imagine a single day where the constant noise of advertisements fades into silence—a day where your attention is truly your own. National No-Ads Day is that day. By participating, you open the door to a world that prioritizes focus, connection, and authenticity.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  For individuals, it’s a chance to rediscover the richness of life without distractions: the joy of a quiet morning, the clarity that comes from unplugging, and the satisfaction of being present in your own moments. For businesses, it’s an opportunity to lead with trust, offering customers ad-free experiences that speak louder than any campaign ever could, while giving back to causes that truly matter. And for communities, it’s a moment to come together, to transform ad-filled spaces into art, and to show what’s possible when we focus on what unites us.
                </p>

                <div className="bg-light p-6 rounded-xl shadow-sm mb-12">
                  <h3 className="font-bold text-xl mb-4">For the future of our attention, and ourselves</h3>
                  <p className="text-lg leading-relaxed">
                    Humanity is facing twin crises of diminishing attention spans and rising digital fatigue. Research shows that digital interruptions cost us 23 minutes of recovery time for each distraction, while constant connectivity is linked to rising anxiety and reduced deep thinking. The attention economy threatens our cognitive abilities, but we are not past the point of no return. Now, more than ever, National No-Ads Day serves as a beacon of positivity and inspiration—a reminder of the power we still hold over our attention.
                  </p>
                </div>
              </div>
              
              {/* Vision & Call to Action */}
              <div className="bg-primary/5 border border-primary/20 p-8 rounded-xl mb-12">
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">One day of rest, a year of attention</h3>
                <p className="text-lg leading-relaxed mb-6">
                  National No-Ads Day is not just about escaping ads—it’s about sparking a worldwide conversation. It’s a day to pause, reflect, and imagine a future where our attention is respected, our minds are clearer, and our connections are more genuine.
                </p>
                <p className="text-lg leading-relaxed">
                This isn’t just a break from ads—it’s an invitation to rethink what we value, to reclaim the power of our attention, and to build a future where authenticity thrives. Will you join us in this revolution of focus and connection? This one day could spark a movement that changes everything.
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
