import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDroplet, FiActivity, FiSun, FiLeaf } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Card from '../components/common/Card'

const SoilAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const soilTypes = [
    { value: 'clay', label: 'Clay' },
    { value: 'sandy', label: 'Sandy' },
    { value: 'loamy', label: 'Loamy' },
    { value: 'silty', label: 'Silty' },
  ]

  const cropTypes = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'corn', label: 'Corn' },
    { value: 'rice', label: 'Rice' },
    { value: 'vegetables', label: 'Vegetables' },
  ]

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult({
        healthScore: 78,
        phLevel: 6.5,
        nitrogen: 'Medium',
        phosphorus: 'High',
        potassium: 'Low',
        organicMatter: '2.5%',
        recommendations: [
          'Add potassium-rich fertilizer',
          'Increase organic matter with compost',
          'Maintain current pH level',
          'Consider crop rotation with legumes',
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
            Soil Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze your soil health and get nutrient recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Soil Information
                </h2>

                <div className="space-y-4">
                  <Select
                    label="Soil Type"
                    placeholder="Select soil type"
                    options={soilTypes}
                  />
                  <Select
                    label="Intended Crop"
                    placeholder="Select crop type"
                    options={cropTypes}
                  />
                  <Input
                    label="pH Level"
                    type="number"
                    step="0.1"
                    placeholder="Enter pH level (0-14)"
                  />
                  <Input
                    label="Sample Location"
                    type="text"
                    placeholder="Field location"
                  />
                  <Input
                    label="Sample Date"
                    type="date"
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
                  Analyze Soil
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
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Analysis Results
                    </h2>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Overall Health Score</span>
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {result.healthScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-primary-500 h-3 rounded-full"
                          style={{ width: `${result.healthScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiDroplet className="w-5 h-5 text-blue-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">pH Level</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{result.phLevel}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiLeaf className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Organic Matter</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{result.organicMatter}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Nitrogen</span>
                        <span className={`font-medium ${
                          result.nitrogen === 'High' ? 'text-green-600' : result.nitrogen === 'Low' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{result.nitrogen}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Phosphorus</span>
                        <span className={`font-medium ${
                          result.phosphorus === 'High' ? 'text-green-600' : result.phosphorus === 'Low' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{result.phosphorus}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Potassium</span>
                        <span className={`font-medium ${
                          result.potassium === 'High' ? 'text-green-600' : result.potassium === 'Low' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{result.potassium}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="text-primary-500 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button size="lg" fullWidth className="mt-6">
                      Get Fertilizer Recommendations
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <FiDroplet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter soil information to analyze health
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

export default SoilAnalysis
