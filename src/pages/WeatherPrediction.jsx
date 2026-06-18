import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiCloud, FiDroplet, FiWind, FiMapPin, FiSearch } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { StatCard } from '../components/common/Card'

const WeatherPrediction = () => {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setWeatherData({
        current: {
          temp: 28,
          humidity: 65,
          windSpeed: 12,
          condition: 'Partly Cloudy',
          feelsLike: 30,
        },
        forecast: [
          { day: 'Mon', temp: 28, condition: 'Sunny' },
          { day: 'Tue', temp: 26, condition: 'Cloudy' },
          { day: 'Wed', temp: 24, condition: 'Rainy' },
          { day: 'Thu', temp: 25, condition: 'Cloudy' },
          { day: 'Fri', temp: 27, condition: 'Sunny' },
          { day: 'Sat', temp: 29, condition: 'Sunny' },
          { day: 'Sun', temp: 28, condition: 'Partly Cloudy' },
        ],
        alerts: [
          { type: 'Rain', message: 'Heavy rain expected on Wednesday', severity: 'Moderate' },
        ],
      })
      setLoading(false)
    }, 1500)
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
                value={`${weatherData.current.temp}°C`}
                icon={FiSun}
                color="primary"
              />
              <StatCard
                title="Humidity"
                value={`${weatherData.current.humidity}%`}
                icon={FiDroplet}
                color="secondary"
              />
              <StatCard
                title="Wind Speed"
                value={`${weatherData.current.windSpeed} km/h`}
                icon={FiWind}
                color="accent"
              />
              <StatCard
                title="Feels Like"
                value={`${weatherData.current.feelsLike}°C`}
                icon={FiSun}
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
                    <div className="text-8xl mb-4">⛅</div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {weatherData.current.condition}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {location || 'Your Location'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    7-Day Forecast
                  </h2>
                  <div className="grid grid-cols-7 gap-2">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{day.day}</p>
                        <div className="text-2xl mb-2">
                          {day.condition === 'Sunny' ? '☀️' : day.condition === 'Cloudy' ? '☁️' : day.condition === 'Rainy' ? '🌧️' : '⛅'}
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{day.temp}°</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {weatherData.alerts.length > 0 && (
              <Card className="mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Weather Alerts
                  </h2>
                  <div className="space-y-3">
                    {weatherData.alerts.map((alert, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <FiCloud className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{alert.type} Alert</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Farming Recommendations
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Good conditions for spraying pesticides tomorrow
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Plan irrigation for Wednesday due to expected rain
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ideal conditions for harvesting on Friday
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
