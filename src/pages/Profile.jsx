import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiEdit2, FiSave, FiX } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { getProfile, updateProfile } from '../api/authApi'
import toast from 'react-hot-toast'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    profileImage: '',
    createdAt: '',
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: '',
  })

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const response = await getProfile()
      if (response.data.success) {
        const userData = response.data.data.user
        setUser(userData)
        setFormData({
          name: userData.name,
          email: userData.email,
          password: '',
          profileImage: userData.profileImage || '',
        })
      }
    } catch (error) {
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleEdit = () => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      profileImage: user.profileImage || '',
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      }
      if (formData.password) {
        updateData.password = formData.password
      }
      if (formData.profileImage) {
        updateData.profileImage = formData.profileImage
      }

      const response = await updateProfile(updateData)
      if (response.data.success) {
        setUser({
          ...user,
          ...response.data.data.user,
        })
        setIsEditing(false)
        toast.success('Profile updated successfully')
      } else {
        toast.error(response.data.message || 'Failed to update profile')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      profileImage: user.profileImage || '',
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (loading && !user.name) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </DashboardLayout>
    )
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
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto">
                      <FiUser className="w-16 h-16 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                      <FiCamera className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4 capitalize">
                  {user.role}
                </p>
                {!isEditing ? (
                  <Button variant="outline" icon={FiEdit2} fullWidth onClick={handleEdit}>
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" icon={FiX} fullWidth onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button icon={FiSave} fullWidth onClick={handleSave} loading={loading}>
                      Save
                    </Button>
                  </div>
                )}
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
                    <span className="text-gray-900 dark:text-white">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Role</span>
                    <span className="text-gray-900 dark:text-white capitalize">{user.role}</span>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    {isEditing ? (
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        icon={FiUser}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={FiMail}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {user.email}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password (optional)</label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                )}

                {isEditing && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image URL (optional)</label>
                    <Input
                      type="text"
                      name="profileImage"
                      value={formData.profileImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      icon={FiCamera}
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default Profile
