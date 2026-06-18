import React from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiEdit2 } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'

const Profile = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div>
            <Card>
              <div className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto">
                    <FiUser className="w-16 h-16 text-primary-600 dark:text-primary-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <FiCamera className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  John Farmer
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Farmer
                </p>
                <Button variant="outline" icon={FiEdit2} fullWidth>
                  Edit Profile
                </Button>
              </div>
            </Card>

            <Card className="mt-6">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Account Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                    <span className="text-gray-900 dark:text-white">Jan 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Orders</span>
                    <span className="text-gray-900 dark:text-white">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fields</span>
                    <span className="text-gray-900 dark:text-white">3</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Farmer"
                    icon={FiUser}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    icon={FiMail}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    icon={FiPhone}
                  />
                  <Input
                    label="Location"
                    type="text"
                    placeholder="Farm City, FC"
                    icon={FiMapPin}
                  />
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Farm Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Farm Name"
                    type="text"
                    placeholder="Green Valley Farm"
                  />
                  <Input
                    label="Farm Size (acres)"
                    type="number"
                    placeholder="50"
                  />
                  <Input
                    label="Primary Crop"
                    type="text"
                    placeholder="Wheat"
                  />
                  <Input
                    label="Years of Experience"
                    type="number"
                    placeholder="10"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default Profile
