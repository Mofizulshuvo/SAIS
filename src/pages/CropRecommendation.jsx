import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiActivity, FiSun, FiDroplet, FiTrendingUp } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Card from '../components/common/Card'

const CropRecommendation = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const soilTypes = [
    { value: 'clay', label: 'Clay' },
    { value: 'sandy', label: 'Sandy' },
    { value: 'loamy', label: 'Loamy' },
    { value: 'silty', label: 'Silty' },
  ]

  const climateTypes = [
    { value: 'tropical', label: 'Tropical' },
    { value: 'temperate', label: 'Temperate' },
    { value: 'arid', label: 'Arid' },
    { value: 'mediterranean', label: 'Mediterranean' },
  ]

  const seasons = [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
  ]

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult({
        topRecommendations: [
          { name: 'Wheat', suitability: 95, yield: '4.5 tons/acre', reason: 'Perfect match for soil and climate' },
          { name: 'Barley', suitability: 88, yield: '3.8 tons/acre', reason: 'Good alternative with similar requirements' },
          { name: 'Oats', suitability: 82, yield: '3.2 tons/acre', reason: 'Suitable for current conditions' },
        ],
        soilHealth: 'Good',
        waterRequirement: 'Medium',
        expectedProfit: '$2,500/acre',
        plantingTips: [
          'Plant in early spring for best results',
          'Ensure proper drainage in clay soil',
          'Apply nitrogen fertilizer at planting',
          'Monitor for fungal diseases in humid conditions',
        ],
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crop Recommendation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get AI-powered crop suggestions based on your conditions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Farm Conditions
                </h2>

                <div className="space-y-4">
                  <Select
                    label="Soil Type"
                    placeholder="Select soil type"
                    options={soilTypes}
                  />
                  <Select
                    label="Climate Zone"
                    placeholder="Select climate"
                    options={climateTypes}
                  />
                  <Select
                    label="Planting Season"
                    placeholder="Select season"
                    options={seasons}
                  />
                  <Input
                    label="Field Area (acres)"
                    type="number"
                    placeholder="Enter field area"
                  />
                  <Input
                    label="Available Water Source"
                    type="text"
                    placeholder="e.g., irrigation, rain-fed"
                  />
                  <Input
                    label="Budget per Acre ($)"
                    type="number"
                    placeholder="Enter budget"
                  />
                </div>

                <Button
                  size="lg"
                  fullWidth
                  icon={FiActivity}
                  loading={isAnalyzing}
                  onClick={handleAnalyze}
                  className="mt-6"
                >
                  Get Recommendations
                </Button>
              </div>
            </Card>
          </div>

          <div>
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Top Recommendations
                    </h2>
                    <div className="space-y-4">
                      {result.topRecommendations.map((crop, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{crop.name}</h3>
                            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                              {crop.suitability}% match
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {crop.reason}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <FiTrendingUp className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600 dark:text-gray-400">{crop.yield}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Expected Returns
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expected Profit</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {result.expectedProfit}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Water Need</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {result.waterRequirement}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Planting Tips
                    </h2>
                    <ul className="space-y-3">
                      {result.plantingTips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                <Button size="lg" fullWidth className="mt-6">
                  View Detailed Growing Guide
                </Button>
              </motion.div>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <FiActivity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Recommendations Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter your farm conditions to get crop suggestions
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default CropRecommendation
