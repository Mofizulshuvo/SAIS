import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiActivity, FiSun, FiDroplet, FiTrendingUp } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Card from '../components/common/Card'
import { recommendCrop } from '../api/cropApi'
import toast from 'react-hot-toast'

const CropRecommendation = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    rainfall: '',
    humidity: '',
    soilType: '',
    season: '',
    location: '',
  })

  const soilTypes = [
    { value: 'clay', label: 'Clay' },
    { value: 'sandy', label: 'Sandy' },
    { value: 'loamy', label: 'Loamy' },
    { value: 'silty', label: 'Silty' },
  ]

  const seasons = [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAnalyze = async () => {
    if (!formData.nitrogen || !formData.phosphorus || !formData.potassium || !formData.ph || !formData.temperature || !formData.rainfall || !formData.humidity) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await recommendCrop(formData)
      if (response.data.success) {
        setResult(response.data.data.record)
        toast.success('Crop recommendation generated successfully')
      } else {
        toast.error(response.data.message || 'Recommendation failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate recommendations')
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
                    label="Temperature (°C)"
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="-20 to 60"
                    min="-20"
                    max="60"
                    required
                  />
                  <Input
                    label="Rainfall (mm)"
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    placeholder="0-1000"
                    min="0"
                    max="1000"
                    required
                  />
                  <Input
                    label="Humidity (%)"
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    placeholder="0-100"
                    min="0"
                    max="100"
                    required
                  />
                  <Select
                    label="Soil Type (optional)"
                    placeholder="Select soil type"
                    options={soilTypes}
                    value={formData.soilType}
                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  />
                  <Select
                    label="Season (optional)"
                    placeholder="Select season"
                    options={seasons}
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  />
                  <Input
                    label="Location (optional)"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Farm location"
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
                      Recommended Crops
                    </h2>
                    <div className="space-y-4">
                      {result.recommendations && result.recommendations.length > 0 ? (
                        result.recommendations.map((crop, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{crop.name || `Crop ${index + 1}`}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {crop.reason || 'Recommended based on soil and climate conditions'}
                            </p>
                            {crop.suitability && (
                              <div className="flex items-center space-x-1 text-sm">
                                <FiTrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600 dark:text-gray-400">Suitability: {crop.suitability}%</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">No recommendations available</p>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Input Summary
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Nitrogen</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.nitrogen || 'N/A'} mg/kg</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Phosphorus</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.phosphorus || 'N/A'} mg/kg</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Potassium</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.potassium || 'N/A'} mg/kg</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">pH Level</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.ph || 'N/A'}</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Temperature</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.temperature || 'N/A'}°C</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Rainfall</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.rainfall || 'N/A'} mm</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Humidity</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.humidity || 'N/A'}%</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Soil Type</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">{result.input?.soilType || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button size="lg" fullWidth>
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
