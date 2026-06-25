import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiCloud, FiDroplet, FiWind, FiMapPin, FiSearch } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { StatCard } from '../components/common/Card'
import { getCurrentWeather, getForecast } from '../api/weatherApi'
import toast from 'react-hot-toast'

const WeatherPrediction = () => {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!location) {
      toast.error('Please enter a location')
      return
    }

    setLoading(true)
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        getCurrentWeather({ location }),
        getForecast({ location, days: 7 })
      ])

      if (currentResponse.data.success && forecastResponse.data.success) {
        setWeatherData({
          current: currentResponse.data.data.record,
          forecast: forecastResponse.data.data.record,
        })
        toast.success('Weather data fetched successfully')
      } else {
        toast.error('Failed to fetch weather data')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
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
            Weather Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get accurate weather forecasts for better crop planning
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter location..."
                icon={FiMapPin}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button icon={FiSearch} loading={loading} onClick={handleSearch}>
              Get Weather
            </Button>
          </div>
        </div>

        {weatherData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Temperature"
                value={`${weatherData.current?.weather?.temperature || 0}°C`}
                icon={FiSun}
                color="primary"
              />
              <StatCard
                title="Humidity"
                value={`${weatherData.current?.weather?.humidity || 0}%`}
                icon={FiDroplet}
                color="secondary"
              />
              <StatCard
                title="Wind Speed"
                value={`${weatherData.current?.weather?.windSpeed || 0} m/s`}
                icon={FiWind}
                color="accent"
              />
              <StatCard
                title="Location"
                value={weatherData.current?.location?.name || location}
                icon={FiMapPin}
                color="success"
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Current Weather
                  </h2>
                  <div className="text-center py-8">
                    <div className="text-8xl mb-4">🌡️</div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {weatherData.current?.weather?.temperature || 0}°C
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {weatherData.current?.location?.name || location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Observed: {weatherData.current?.weather?.observedAt ? new Date(weatherData.current.weather.observedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Weather Details
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Humidity</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{weatherData.current?.weather?.humidity || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Wind Speed</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{weatherData.current?.weather?.windSpeed || 0} m/s</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Weather Code</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{weatherData.current?.weather?.weatherCode || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Farming Recommendations
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monitor humidity levels for irrigation planning
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-blue-500 mt-1">ℹ</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Current conditions suitable for most field activities
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <FiSun className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Weather Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a location to get weather predictions
              </p>
            </div>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  )
}

export default WeatherPrediction
