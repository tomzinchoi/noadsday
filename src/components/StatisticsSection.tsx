import { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { motion } from 'framer-motion'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function StatisticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Bar chart data - Daily Ad Exposure by Medium
  const barChartData = {
    labels: ['Social Media', 'Television', 'Websites', 'Mobile Apps', 'Other'],
    datasets: [
      {
        label: 'Number of Ads',
        data: [2000, 1000, 800, 700, 500],
        backgroundColor: [
          'rgba(26, 115, 232, 0.8)',
          'rgba(52, 168, 83, 0.8)',
          'rgba(250, 123, 23, 0.8)',
          'rgba(26, 115, 232, 0.6)',
          'rgba(52, 168, 83, 0.6)',
        ],
        borderColor: [
          'rgba(26, 115, 232, 1)',
          'rgba(52, 168, 83, 1)',
          'rgba(250, 123, 23, 1)',
          'rgba(26, 115, 232, 0.8)',
          'rgba(52, 168, 83, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  }
  
  // Bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} ads`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString()
          }
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    animation: {
      duration: 2000,
    },
  }
  
  // Pie chart data - Time Lost to Ad Consumption by Age Group
  const pieChartData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        data: [42, 38, 30, 25, 20],
        backgroundColor: [
          'rgba(26, 115, 232, 0.8)',
          'rgba(52, 168, 83, 0.8)',
          'rgba(250, 123, 23, 0.8)',
          'rgba(26, 115, 232, 0.6)',
          'rgba(52, 168, 83, 0.6)',
        ],
        borderColor: [
          'rgba(255, 255, 255, 0.5)',
          'rgba(255, 255, 255, 0.5)',
          'rgba(255, 255, 255, 0.5)',
          'rgba(255, 255, 255, 0.5)',
          'rgba(255, 255, 255, 0.5)',
        ],
        borderWidth: 2,
      },
    ],
  }
  
  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Age ${context.label}: ${context.raw} minutes daily`
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
    },
  }
  
  return (
    <section 
      ref={sectionRef}
      id="statistics"
      className="py-20 md:py-32 bg-light relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-4">
            Key Statistics
          </h2>
          <p className="text-lg text-dark/80 max-w-2xl mx-auto">
            Visualizing the impact of advertising on our daily attention and time
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-heading font-bold mb-6">Daily Ad Exposure by Medium</h3>
            <div className="h-80">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
            <p className="text-sm text-dark/60 mt-4 italic">
              Data represents estimated average exposure across different media channels
            </p>
          </motion.div>
          
          {/* Subscription Services Growth Chart - New chart based on the data */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-heading font-bold mb-6">Subscription Services Growth</h3>
            <div className="h-80">
              <Bar 
                data={{
                  labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                  datasets: [{
                    label: 'Annual Growth Rate (%)',
                    data: [12.5, 14.2, 15.8, 16.5, 17.3, 18.1],
                    backgroundColor: 'rgba(250, 123, 23, 0.7)',
                    borderColor: 'rgba(250, 123, 23, 1)',
                    borderWidth: 1
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context: any) {
                          return `Growth Rate: ${context.parsed.y}%`
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                      title: {
                        display: true,
                        text: 'Growth Rate (%)'
                      }
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: 'Year'
                      }
                    }
                  },
                  animation: {
                    duration: 2000,
                  },
                }}
              />
            </div>
            <p className="text-sm text-dark/60 mt-4 italic">
              The global digital subscription services market is growing at 17.3% annually (Source: Statista report)
            </p>
          </motion.div>
        </div>
        
        {/* Additional Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
          {/* Digital Fatigue Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="text-4xl text-primary mb-4">86%</div>
            <h3 className="text-lg font-heading font-bold mb-2">Digital Ad Fatigue</h3>
            <p className="text-dark/70 text-sm">
              86% of social media users report feeling fatigued by excessive ads (Source: Social Media Trends Report)
            </p>
          </motion.div>
          
          {/* Subscription Services Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="text-4xl text-secondary mb-4">7+</div>
            <h3 className="text-lg font-heading font-bold mb-2">Subscription Services</h3>
            <p className="text-dark/70 text-sm">
              The average consumer subscribes to more than 7 paid services (Source: Deloitte Digital Media Trends)
            </p>
          </motion.div>
          
          {/* Productivity Loss Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="text-4xl text-accent mb-4">$650B</div>
            <h3 className="text-lg font-heading font-bold mb-2">Annual Productivity Loss</h3>
            <p className="text-dark/70 text-sm">
              Productivity loss due to attention dispersion is estimated at $650 billion annually (Source: Global Productivity Institute)
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-dark/60 max-w-3xl mx-auto">
            Data sources: Analysis of digital media consumption patterns, marketing industry reports, and screen time research studies. Estimates suggest individuals may be exposed to thousands of ads daily, with figures ranging from 4,000 to over 10,000, depending on lifestyle and media consumption (Source: Marketing industry estimates, Forbes, Digital Marketing Institute).
          </p>
        </motion.div>
      </div>
    </section>
  )
}
