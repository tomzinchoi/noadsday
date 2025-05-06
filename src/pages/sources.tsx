// filepath: /workspaces/noadsday/src/pages/sources.tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import Head from 'next/head'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Source data from source.md
const sources = [
  {
    id: 1,
    title: "Beyond The Digital Noise: Rethinking Engagement In A Saturated Landscape With Experiential Marketing",
    author: "Forbes",
    year: 2024,
    link: "https://www.forbes.com/councils/forbescommunicationscouncil/2024/12/17/beyond-the-digital-noise-rethinking-engagement-in-a-saturated-landscape-with-experiential-marketing/",
  },
  {
    id: 2,
    title: "How Many Ads Do We See a Day?",
    author: "Siteefy",
    year: 2025,
    link: "https://siteefy.com/how-many-ads-do-we-see-a-day",
  },
  {
    id: 3,
    title: "How Many Ads Do We See a Day – Trends & Statistics",
    author: "B9 Solution",
    year: 2024,
    link: "https://b9solution.com/how-many-ads-do-we-see-a-day-top-trends-statistics",
  },
  {
    id: 4,
    title: "The Psychology of Advertising",
    author: "University of Southern California (USC)",
    year: 2023,
    link: "https://appliedpsychologydegree.usc.edu/blog/thinking-vs-feeling-the-psychology-of-advertising",
  },
  {
    id: 5,
    title: "Streaming video at a crossroads: Redesign yesterday's models or reinvent for tomorrow?",
    author: "Deloitte",
    year: 2024,
    link: "https://www2.deloitte.com/us/en/insights/industry/technology/digital-media-trends-consumption-habits-survey/2024/customization-and-personalization-lead-the-svod-revolution.html",
  },
  {
    id: 6,
    title: "Subscription E-Commerce Market Size, Share and Trends 2025 to 2034",
    author: "Precedence Research",
    year: 2024,
    link: "https://www.precedenceresearch.com/subscription-e-commerce-market",
  },
  {
    id: 7,
    title: "74% of people are tired of social media ads—but they're effective",
    author: "SurveyMonkey",
    year: 2024,
    link: "https://www.surveymonkey.com/curiosity/74-of-people-are-tired-of-social-media-ads-but-theyre-effective/",
  },
  {
    id: 8,
    title: "Attention Span: A Groundbreaking Way to Restore Balance, Happiness and Productivity",
    author: "Gloria Mark",
    year: 2023,
    link: "https://www.amazon.com/Attention-Span-Finding-Fighting-Distraction/dp/1335449418",
  },
  {
    id: 9,
    title: "Stolen Focus: Why You Can't Pay Attention--and How to Think Deeply Again",
    author: "Johann Hari",
    year: 2022,
    link: "https://www.amazon.com/Stolen-Focus-Attention-Think-Deeply/dp/0593138511",
  },
  {
    id: 10,
    title: "How to Save Yourself From “Information Overload",
    author: "Harvard Business Review (HBR)",
    year: 2022,
    link: "https://hbr.org/2021/09/how-to-save-yourself-from-information-overload",
  },
  {
    id: 11,
    title: "Reducing Information Overload in Your Organization",
    author: "Harvard Business Review (HBR)",
    year: 2023,
    link: "https://hbr.org/2023/05/reducing-information-overload-in-your-organization",
  },
  {
    id: 12,
    title: "Stress in America 2022",
    author: "American Psychological Association (APA)",
    year: 2022,
    link: "https://www.apa.org/news/press/releases/stress/2022/concerned-future-inflation",
  },

];

export default function SourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set up page animations
    const ctx = gsap.context(() => {
      // Animation setup specific to this page
      gsap.from(".source-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sources-container",
          start: "top 80%",
        }
      });
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Head>
        <title>Sources & References | National No-Ads Day</title>
        <meta name="description" content="Explore our credible sources and references about advertising's impact on attention and digital wellbeing." />
      </Head>
      
      <div ref={pageRef} className="min-h-screen">
        <Header />
        
        {/* Hero Banner */}
        <section className="pt-32 pb-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Sources & References
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90">
              Our verified and credible sources on advertising's impact
            </p>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-20 bg-light">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-heading font-bold mb-10 text-center">
                References & Citations
              </h2>
              
              <div className="sources-container space-y-4 mb-16">
                {sources.map((source) => (
                  <div 
                    key={source.id}
                    className="source-item bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-primary"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-dark mb-2">
                        {source.title}
                      </h3>
                      <span className="text-dark/50 font-medium">{source.year}</span>
                    </div>
                    <p className="text-dark/70 text-sm mb-4">
                      {source.author}
                    </p>
                    <a 
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      View Source
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-6">Data Compilation Note</h3>
                <p className="text-dark/80 mb-4">
                  The statistics presented throughout our website are compiled and aggregated from diverse and reputable sources listed above. In cases where figures differ among sources, we've calculated averages to provide representative values.
                </p>
                <p className="text-dark/80 mb-4">
                  For instance, the daily ad exposure range of 4,000-10,000 represents consolidated findings across multiple research sources. The actual exposure varies significantly based on individual media consumption, location, and use of ad-blocking technologies.
                </p>
                <p className="text-dark/80">
                  Our aim is to present a data-backed perspective on advertising's impact while acknowledging the complexities in precisely measuring these phenomena in today's digital landscape.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  )
}