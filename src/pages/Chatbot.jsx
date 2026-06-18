import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiBot, FiUser, FiX } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am your AI agricultural assistant. How can I help you today?' },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = { id: Date.now(), type: 'user', text: inputValue }
    setMessages([...messages, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, type: 'bot', text: getBotResponse(inputValue) }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('disease') || lowerInput.includes('sick')) {
      return 'I can help with disease detection! Upload an image of your plant in the Disease Detection section, and our AI will identify any diseases and recommend treatments.'
    } else if (lowerInput.includes('soil') || lowerInput.includes('fertilizer')) {
      return 'For soil analysis, go to the Soil Analysis section. Enter your soil type and crop information to get nutrient recommendations and fertilization advice.'
    } else if (lowerInput.includes('weather') || lowerInput.includes('rain')) {
      return 'Check the Weather Prediction section for accurate forecasts. This will help you plan irrigation, spraying, and harvesting activities.'
    } else if (lowerInput.includes('irrigation') || lowerInput.includes('water')) {
      return 'Use our Smart Irrigation tool to calculate optimal watering schedules based on your crop type, soil conditions, and local weather.'
    } else if (lowerInput.includes('crop') || lowerInput.includes('plant')) {
      return 'The Crop Recommendation tool can suggest the best crops for your soil type, climate, and season. It also provides expected yields and planting tips.'
    } else if (lowerInput.includes('market') || lowerInput.includes('buy') || lowerInput.includes('sell')) {
      return 'Visit our Marketplace to buy agricultural products from verified farmers or sell your own produce. You can also track orders and manage your cart.'
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello! I am here to help with all your agricultural needs. Ask me about disease detection, soil analysis, weather, irrigation, crop recommendations, or the marketplace.'
    } else {
      return 'I can help you with disease detection, soil analysis, weather prediction, irrigation scheduling, crop recommendations, and marketplace activities. What would you like to know more about?'
    }
  }

  const suggestions = [
    'How do I detect plant diseases?',
    'What crops should I plant?',
    'When should I irrigate my field?',
    'Check weather for my location',
    'How to improve soil health?',
  ]

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant answers to your agricultural questions
          </p>
        </div>

        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[70%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-secondary-600 text-white'
                  }`}>
                    {message.type === 'user' ? <FiUser className="w-4 h-4" /> : <FiBot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary-600 text-white">
                    <FiBot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(suggestion)}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button icon={FiSend} onClick={handleSend}>
                Send
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  )
}

export default Chatbot
