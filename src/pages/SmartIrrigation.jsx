import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDroplet, FiActivity, FiCalendar, FiClock } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Card from '../components/common/Card'
import { StatCard } from '../components/common/Card'
import { getIrrigationRecommendation } from '../api/irrigationApi'
import toast from 'react-hot-toast'

const SmartIrrigation = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    soilMoisture: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    area: '',
    cropType: '',
    soilType: '',
    growthStage: '',
    location: '',
  })

  const cropTypes = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'corn', label: 'Corn' },
    { value: 'rice', label: 'Rice' },
    { value: 'vegetables', label: 'Vegetables' },
  ]

  const soilTypes = [
    { value: 'clay', label: 'Clay' },
    { value: 'sandy', label: 'Sandy' },
    { value: 'loamy', label: 'Loamy' },
  ]

  const growthStages = [
    { value: 'seedling', label: 'Seedling' },
    { value: 'vegetative', label: 'Vegetative' },
    { value: 'flowering', label: 'Flowering' },
    { value: 'maturity', label: 'Maturity' },
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCalculate = async () => {
    if (!formData.soilMoisture || !formData.temperature || !formData.humidity) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsCalculating(true)
    try {
      const response = await getIrrigationRecommendation(formData)
      if (response.data.success) {
        setResult(response.data.data.record)
        toast.success('Irrigation recommendation generated successfully')
      } else {
        toast.error(response.data.message || 'Recommendation failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate recommendations')
    } finally {
      setIsCalculating(false)
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
            Smart Irrigation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Optimize water usage with intelligent irrigation scheduling
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Irrigation Parameters
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Soil Moisture (%)"
                    type="number"
                    name="soilMoisture"
                    value={formData.soilMoisture}
                    onChange={handleChange}
                    placeholder="0-100"
                    min="0"
                    max="100"
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
                  <Input
                    label="Rainfall (mm, optional)"
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    placeholder="0-500"
                    min="0"
                    max="500"
                  />
                  <Input
                    label="Field Area (acres, optional)"
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="0.01-1000000"
                    min="0.01"
                    max="1000000"
                  />
                  <Select
                    label="Crop Type (optional)"
                    placeholder="Select crop"
                    options={cropTypes}
                    value={formData.cropType}
                    onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  />
                  <Select
                    label="Soil Type (optional)"
                    placeholder="Select soil type"
                    options={soilTypes}
                    value={formData.soilType}
                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  />
                  <Select
                    label="Growth Stage (optional)"
                    placeholder="Select growth stage"
                    options={growthStages}
                    value={formData.growthStage}
                    onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
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
                  loading={isCalculating}
                  onClick={handleCalculate}
                  className="mt-6"
                >
                  Calculate Schedule
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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Irrigation Recommendation
                    </h2>
                    <div className="space-y-4">
                      {result.recommendation && typeof result.recommendation === 'object' ? (
                        <>
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FiDroplet className="w-5 h-5 text-primary-500" />
                              <span className="text-gray-900 dark:text-white">Water Required</span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{result.recommendation.waterRequired || 'N/A'} L</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FiClock className="w-5 h-5 text-primary-500" />
                              <span className="text-gray-900 dark:text-white">Duration</span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{result.recommendation.duration || 'N/A'}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FiActivity className="w-5 h-5 text-green-500" />
                              <span className="text-gray-900 dark:text-white">Water Savings</span>
                            </div>
                                <span className="font-medium text-gray-900 dark:text-white">{result.recommendation.savings || 'N/A'}%</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {result.recommendation || 'No recommendation available'}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Input Summary
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Soil Moisture</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.soilMoisture || 'N/A'}%</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Temperature</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.temperature || 'N/A'}°C</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Humidity</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.humidity || 'N/A'}%</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Rainfall</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.input?.rainfall || 'N/A'} mm</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button size="lg" fullWidth className="mt-6">
                  Set Automatic Irrigation
                </Button>
              </motion.div>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <FiDroplet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Schedule Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter irrigation parameters to calculate schedule
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

export default SmartIrrigation
