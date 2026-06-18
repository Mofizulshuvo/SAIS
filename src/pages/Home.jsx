import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiUsers, FiAward, FiShield, FiMail, FiPhone, FiMapPin, FiActivity, FiDroplet, FiSun, FiShoppingBag } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import MainLayout from '../components/layout/MainLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

const Home = () => {
  const { darkMode } = useTheme()

  const features = [
    {
      icon: FiActivity,
      title: 'Disease Detection',
      description: 'AI-powered plant disease detection using image recognition technology',
    },
    {
      icon: FiDroplet,
      title: 'Soil Analysis',
      description: 'Comprehensive soil health analysis and nutrient recommendations',
    },
    {
      icon: FiSun,
      title: 'Weather Prediction',
      description: 'Accurate weather forecasting for better crop planning',
    },
    {
      icon: FiActivity,
      title: 'Smart Irrigation',
      description: 'Intelligent irrigation scheduling to optimize water usage',
    },
    {
      icon: FiActivity,
      title: 'Crop Recommendation',
      description: 'Data-driven crop suggestions based on soil and climate conditions',
    },
    {
      icon: FiShoppingBag,
      title: 'Marketplace',
      description: 'Connect with buyers and sellers in our agricultural marketplace',
    },
  ]

  const testimonials = [
    {
      name: 'John Farmer',
      role: 'Farmer',
      content: 'SAIS has revolutionized how I manage my farm. The disease detection feature saved my crops last season!',
    },
    {
      name: 'Sarah Green',
      role: 'Agricultural Expert',
      content: 'The soil analysis tool provides incredibly accurate recommendations. A must-have for modern farming.',
    },
    {
      name: 'Mike Johnson',
      role: 'Farm Owner',
      content: 'Smart irrigation has reduced my water usage by 40% while increasing yield. Amazing technology!',
    },
  ]

  const faqs = [
    {
      question: 'How does the disease detection work?',
      answer: 'Our AI-powered system analyzes images of your plants to identify diseases and provides treatment recommendations with high accuracy.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your data. Your information is never shared without consent.',
    },
    {
      question: 'Can I use SAIS on mobile devices?',
      answer: 'Yes, SAIS is fully responsive and works seamlessly on all devices including smartphones and tablets.',
    },
    {
      question: 'What pricing plans are available?',
      answer: 'We offer flexible pricing plans for farmers, buyers, and enterprises. Contact us for a custom quote.',
    },
  ]

  return (
    <MainLayout darkMode={darkMode} toggleDarkMode={() => {}}>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Smart Agriculture for a
                <span className="text-gradient"> Better Future</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Empower your farming with AI-driven insights. Detect diseases, analyze soil, predict weather, and optimize irrigation—all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" icon={FiArrowRight}>
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/#features">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 glass-effect">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary-100 dark:bg-primary-900/20 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10K+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Farmers</div>
                    </div>
                    <div className="bg-secondary-100 dark:bg-secondary-900/20 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">95%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Accuracy</div>
                    </div>
                    <div className="bg-accent-100 dark:bg-accent-900/20 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Diseases</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">24/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to modernize your farming operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive agricultural solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'AI Disease Detection',
                description: 'Upload images of your plants and get instant disease identification with treatment recommendations.',
                color: 'primary',
              },
              {
                title: 'Smart Irrigation',
                description: 'Optimize water usage with intelligent scheduling based on weather and soil conditions.',
                color: 'secondary',
              },
              {
                title: 'Crop Planning',
                description: 'Get personalized crop recommendations based on your soil analysis and local climate.',
                color: 'accent',
              },
              {
                title: 'Market Insights',
                description: 'Access real-time market prices and trends to make informed selling decisions.',
                color: 'success',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <Link to="/register">
                      <Button variant="ghost" size="sm">
                        Learn More <FiArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About SAIS
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                SAIS (Smart Agriculture Information System) is a cutting-edge platform designed to revolutionize modern farming through artificial intelligence and data-driven insights.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Our mission is to empower farmers with intelligent tools that increase productivity, reduce costs, and promote sustainable agricultural practices.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <FiCheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">AI-Powered</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Advanced machine learning algorithms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiShield className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Secure</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise-grade security</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiUsers className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Community</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Join thousands of farmers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiAward className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Award-Winning</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Recognized innovation</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose SAIS?</h3>
                <ul className="space-y-3">
                  {[
                    'Increase crop yield by up to 30%',
                    'Reduce water usage by 40%',
                    'Early disease detection saves crops',
                    'Data-driven decision making',
                    '24/7 expert support',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trusted by farmers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get in touch with our team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">info@sais.com</p>
              </div>
            </Card>

            <Card>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
            </Card>

            <Card>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Farm City, FC 12345</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home
