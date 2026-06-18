import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDroplet, FiActivity, FiCalendar, FiClock } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Card from '../components/common/Card'
import { StatCard } from '../components/common/Card'

const SmartIrrigation = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState(null)

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

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setResult({
        waterRequirement: 450,
        frequency: 'Every 3 days',
        duration: '2 hours',
        optimalTime: '6:00 AM',
        savings: 35,
        schedule: [
          { date: '2024-01-22', time: '6:00 AM', duration: '2 hours' },
          { date: '2024-01-25', time: '6:00 AM', duration: '2 hours' },
          { date: '2024-01-28', time: '6:00 AM', duration: '2 hours' },
          { date: '2024-01-31', time: '6:00 AM', duration: '2 hours' },
        ],
      })
      setIsCalculating(false)
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
                  <Select
                    label="Crop Type"
                    placeholder="Select crop"
                    options={cropTypes}
                  />
                  <Select
                    label="Soil Type"
                    placeholder="Select soil type"
                    options={soilTypes}
                  />
                  <Input
                    label="Field Area (acres)"
                    type="number"
                    placeholder="Enter field area"
                  />
                  <Input
                    label="Current Soil Moisture (%)"
                    type="number"
                    placeholder="Enter moisture level"
                  />
                  <Input
                    label="Growth Stage"
                    placeholder="e.g., vegetative, flowering"
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
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <StatCard
                    title="Water Required"
                    value={`${result.waterRequirement}L`}
                    icon={FiDroplet}
                    color="primary"
                  />
                  <StatCard
                    title="Water Savings"
                    value={`${result.savings}%`}
                    icon={FiActivity}
                    color="success"
                  />
                </div>

                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Irrigation Schedule
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FiClock className="w-5 h-5 text-primary-500" />
                          <span className="text-gray-900 dark:text-white">Frequency</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{result.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FiClock className="w-5 h-5 text-primary-500" />
                          <span className="text-gray-900 dark:text-white">Duration</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{result.duration}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FiClock className="w-5 h-5 text-primary-500" />
                          <span className="text-gray-900 dark:text-white">Optimal Time</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{result.optimalTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Upcoming Irrigation
                    </h2>
                    <div className="space-y-3">
                      {result.schedule.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FiCalendar className="w-5 h-5 text-secondary-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.date}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.duration}</span>
                        </div>
                      ))}
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
