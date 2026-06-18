import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Card from '../components/common/Card'
import { USER_ROLES } from '../utils/constants'

const Register = () => {
  const navigate = useNavigate()
  const { registerUser, loading } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data)
      if (result.success) {
        toast.success('Registration successful!')
        navigate('/dashboard')
      } else {
        toast.error(result.error || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred during registration')
    }
  }

  const roleOptions = [
    { value: USER_ROLES.FARMER, label: 'Farmer' },
    { value: USER_ROLES.BUYER, label: 'Buyer' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              SAIS
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join SAIS to start your smart agriculture journey
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              icon={FiUser}
              error={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              icon={FiMail}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />

            <Input
              label="Phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              icon={FiPhone}
              error={errors.phone?.message}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[\d\s-()+]+$/,
                  message: 'Invalid phone number',
                },
              })}
            />

            <Input
              label="Location"
              type="text"
              name="location"
              placeholder="Enter your location"
              icon={FiMapPin}
              error={errors.location?.message}
              {...register('location', {
                required: 'Location is required',
              })}
            />

            <Select
              label="Role"
              name="role"
              placeholder="Select your role"
              options={roleOptions}
              error={errors.role?.message}
              {...register('role', {
                required: 'Role is required',
              })}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a password"
              icon={FiLock}
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              icon={FiLock}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Register
