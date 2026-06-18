import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiShoppingCart, FiHeart, FiStar, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { formatCurrency } from '../utils/helpers'

const ProductDetails = () => {
  const { id } = useParams()

  const product = {
    id: 1,
    name: 'Organic Wheat',
    price: 2.50,
    unit: 'kg',
    category: 'Cereals',
    farmer: 'John Farm',
    rating: 4.8,
    reviews: 124,
    description: 'Premium quality organic wheat grown without pesticides or chemical fertilizers. Perfect for making flour, bread, and other wheat-based products. Our wheat is harvested at peak maturity to ensure maximum nutritional value.',
    image: '🌾',
    location: 'California, USA',
    available: 5000,
    minOrder: 100,
  }

  const reviews = [
    { id: 1, user: 'Alice Johnson', rating: 5, comment: 'Excellent quality wheat! Very fresh and clean.', date: '2024-01-10' },
    { id: 2, user: 'Bob Smith', rating: 4, comment: 'Good product, fast delivery. Will order again.', date: '2024-01-08' },
    { id: 3, user: 'Carol White', rating: 5, comment: 'Best organic wheat I have ever purchased!', date: '2024-01-05' },
  ]

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/marketplace" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6">
          <FiArrowLeft className="mr-2" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-8">
            <div className="text-9xl text-center mb-6">{product.image}</div>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              by {product.farmer}
            </p>

            <div className="flex items-baseline space-x-2 mb-6">
              <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(product.price)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/{product.unit}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                <p className="font-semibold text-gray-900 dark:text-white">{product.category}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
                <p className="font-semibold text-gray-900 dark:text-white">{product.available} kg</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Min Order</p>
                <p className="font-semibold text-gray-900 dark:text-white">{product.minOrder} kg</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-semibold text-gray-900 dark:text-white">{product.location}</p>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <Button size="lg" icon={FiShoppingCart} fullWidth>
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" icon={FiHeart}>
                Wishlist
              </Button>
            </div>

            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Farmer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <FiMapPin className="w-5 h-5" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <FiPhone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <FiMail className="w-5 h-5" />
                  <span>john@farm.com</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Reviews ({reviews.length})
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        {review.user.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{review.user}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default ProductDetails
