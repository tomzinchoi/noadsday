import { useState } from 'react'

// Participation data for each category
const participationData = {
  individuals: [
    {
      id: 1,
      title: "Ad-Free Adventure",
      description: "Go offline—take a nature walk, read a book, or cook a meal without screens."
    },
    {
      id: 2,
      title: "Digital Detox Morning",
      description: "Start your day screen-free with journaling, stretching, or a quiet breakfast."
    },
    {
      id: 3,
      title: "App-Free Challenge",
      description: "Delete or hide ad-heavy apps for the day (social media, YouTube, news)."
    },
    {
      id: 4,
      title: "Analog Alternatives",
      description: "Use paper maps, real books, or handwritten notes—reclaim focus from screens."
    }
  ],
  companies: [
    {
      id: 1,
      title: "Free Premium Day",
      description: "Give users ad-free or premium access for 24 hours to show appreciation and respect."
    },
    {
      id: 2,
      title: "Ad Budget Donation",
      description: "Donate that day's ad spend to a media literacy or mental health nonprofit."
    },
    {
      id: 3,
      title: "Ad-Free Branding Badge",
      description: "Promote a \"No-Ads Today\" banner as a trust-building gesture."
    },
    {
      id: 4,
      title: "One Honest Email",
      description: "Send a single, no-promo email—just real content or gratitude."
    }
  ],
  communities: [
    {
      id: 1,
      title: "Public Ad Blackout",
      description: "Cover local ad spaces with community art or positive messages (with permission)."
    },
    {
      id: 2,
      title: "Unplugged Gatherings",
      description: "Host screen-free meetups like board games, open mics, or picnics."
    },
    {
      id: 3,
      title: "Media Literacy Booths",
      description: "Run casual, friendly workshops on how ads target attention."
    }
  ]
}

export default function ParticipationSection() {
  const [activeTab, setActiveTab] = useState('individuals')
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  
  // Get emoji for the current tab
  const getTabEmoji = (tab: string) => {
    switch(tab) {
      case 'individuals': return '🧍‍♂️';
      case 'companies': return '🏢';
      case 'communities': return '🏘️';
      default: return '👥';
    }
  }
  
  // Get color class for the current tab
  const getColorClass = (tab: string) => {
    switch(tab) {
      case 'individuals': return 'text-primary border-primary';
      case 'companies': return 'text-secondary border-secondary';
      case 'communities': return 'text-accent border-accent';
      default: return 'text-primary border-primary';
    }
  }
  
  // Get background color class for the current tab
  const getBgColorClass = (tab: string) => {
    switch(tab) {
      case 'individuals': return 'bg-primary';
      case 'companies': return 'bg-secondary';
      case 'communities': return 'bg-accent';
      default: return 'bg-primary';
    }
  }
  
  return (
    <section 
      className="py-20 md:py-28 bg-white relative overflow-hidden"
      id="how-to-participate"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            How to <span className="gradient-text">Participate</span>
          </h2>
          <p className="text-lg text-dark/80 max-w-2xl mx-auto">
            Join the movement and experience the benefits of a day without advertisements
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors ${
              activeTab === 'individuals'
                ? 'bg-primary text-white shadow-md'
                : 'bg-light hover:bg-primary/10'
            }`}
            onClick={() => handleTabChange('individuals')}
          >
            <span className="mr-2">🧍‍♂️</span> For Individuals
          </button>
          <button
            className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors ${
              activeTab === 'companies'
                ? 'bg-secondary text-white shadow-md'
                : 'bg-light hover:bg-secondary/10'
            }`}
            onClick={() => handleTabChange('companies')}
          >
            <span className="mr-2">🏢</span> For Companies
          </button>
          <button
            className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors ${
              activeTab === 'communities'
                ? 'bg-accent text-white shadow-md'
                : 'bg-light hover:bg-accent/10'
            }`}
            onClick={() => handleTabChange('communities')}
          >
            <span className="mr-2">🏘️</span> For Communities
          </button>
        </div>
        
        {/* Tab Content Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className={`p-5 rounded-lg ${
            activeTab === 'individuals' ? 'bg-primary/10' : 
            activeTab === 'companies' ? 'bg-secondary/10' : 'bg-accent/10'
          } text-center`}>
            <div className="text-4xl mb-3">{getTabEmoji(activeTab)}</div>
            <h3 className={`text-xl font-bold ${getColorClass(activeTab)}`}>
              {activeTab === 'individuals' ? 'Individual Participation' : 
               activeTab === 'companies' ? 'Company Participation' : 'Community Participation'}
            </h3>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {participationData[activeTab as keyof typeof participationData].map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-xl shadow-md bg-white border-l-4 ${
                  activeTab === 'individuals' ? 'border-primary' : 
                  activeTab === 'companies' ? 'border-secondary' : 'border-accent'
                } hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full ${getBgColorClass(activeTab)} text-white flex items-center justify-center font-bold mr-4 shrink-0`}>
                    {item.id}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-dark/80">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Card */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className={`p-8 rounded-xl shadow-md border ${
            activeTab === 'individuals' ? 'border-primary/20' : 
            activeTab === 'companies' ? 'border-secondary/20' : 'border-accent/20'
          } bg-white`}>
            <h3 className={`text-xl font-heading font-bold mb-5 ${getColorClass(activeTab)}`}>
              Ready to join {activeTab === 'individuals' ? 'in' : activeTab === 'communities' ? 'as a community' : 'as a company'}?
            </h3>
            <p className="text-dark/80 mb-6">
              Make a commitment to experience a day without ads and see the difference it makes in your {activeTab === 'individuals' ? 'life' : activeTab === 'companies' ? 'business' : 'community'}.
            </p>
            <a
              href="#footer-join"
              className={`px-8 py-3 rounded-lg inline-flex items-center font-medium text-white ${getBgColorClass(activeTab)}`}
            >
              Pledge Your Participation
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24"
                className="ml-2"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}