import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDroplet, FiActivity, FiSun } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Card from '../components/common/Card'
import { analyzeSoil } from '../api/soilApi'
import toast from 'react-hot-toast'

const SoilAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: '',
    cropType: '',
    location: '',
  })

  const cropTypes = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'corn', label: 'Corn' },
    { value: 'rice', label: 'Rice' },
    { value: 'vegetables', label: 'Vegetables' },
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAnalyze = async () => {
    if (!formData.nitrogen || !formData.phosphorus || !formData.potassium || !formData.ph || !formData.moisture) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await analyzeSoil(formData)
      if (response.data.success) {
        setResult(response.data.data.record)
        toast.success('Soil analysis completed successfully')
      } else {
        toast.error(response.data.message || 'Analysis failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to analyze soil')
    } finally {
      setIsAnalyzing(false)
    }
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
                  <Input
                    label="Nitrogen (mg/kg)"
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    placeholder="0-500"
                    min="0"
                    max="500"
                    required
                  />
                  <Input
                    label="Phosphorus (mg/kg)"
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleChange}
                    placeholder="0-500"
                    min="0"
                    max="500"
                    required
                  />
                  <Input
                    label="Potassium (mg/kg)"
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleChange}
                    placeholder="0-600"
                    min="0"
                    max="600"
                    required
                  />
                  <Input
                    label="pH Level"
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="0-14"
                    min="0"
                    max="14"
                    required
                  />
                  <Input
                    label="Moisture (%)"
                    type="number"
                    name="moisture"
                    value={formData.moisture}
                    onChange={handleChange}
                    placeholder="0-100"
                    min="0"
                    max="100"
                    required
                  />
                  <Select
                    label="Intended Crop (optional)"
                    placeholder="Select crop type"
                    options={cropTypes}
                    value={formData.cropType}
                    onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  />
                  <Input
                    label="Location (optional)"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Field location"
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
                          {result.analysis?.healthScore || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-primary-500 h-3 rounded-full"
                          style={{ width: `${result.analysis?.healthScore || 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiDroplet className="w-5 h-5 text-blue-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">pH Level</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{result.input?.ph || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiActivity className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Fertility Level</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">{result.analysis?.fertilityLevel || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Nitrogen</span>
                        <span className={`font-medium capitalize ${
                          result.analysis?.nutrients?.nitrogen === 'good' ? 'text-green-600' : result.analysis?.nutrients?.nitrogen === 'low' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{result.analysis?.nutrients?.nitrogen || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Phosphorus</span>
                        <span className={`font-medium capitalize ${
                          result.analysis?.nutrients?.phosphorus === 'good' ? 'text-green-600' : result.analysis?.nutrients?.phosphorus === 'low' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{result.analysis?.nutrients?.phosphorus || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Potassium</span>
                        <span className={`font-medium capitalize ${
                          result.analysis?.nutrients?.potassium === 'good' ? 'text-green-600' : result.analysis?.nutrients?.potassium === 'low' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{result.analysis?.nutrients?.potassium || 'N/A'}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Recommendations
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {result.recommendation || 'No recommendations available'}
                      </p>
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
