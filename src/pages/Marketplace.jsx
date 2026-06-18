import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiShoppingCart, FiHeart } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { formatCurrency } from '../utils/helpers'

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cereals', name: 'Cereals' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'legumes', name: 'Legumes' },
  ]

  const products = [
    { id: 1, name: 'Organic Wheat', price: 2.50, unit: 'kg', category: 'cereals', farmer: 'John Farm', rating: 4.8, image: '🌾' },
    { id: 2, name: 'Fresh Corn', price: 1.80, unit: 'kg', category: 'cereals', farmer: 'Green Valley', rating: 4.5, image: '🌽' },
    { id: 3, name: 'Organic Tomatoes', price: 3.20, unit: 'kg', category: 'vegetables', farmer: 'Sunshine Farm', rating: 4.7, image: '🍅' },
    { id: 4, name: 'Fresh Potatoes', price: 1.50, unit: 'kg', category: 'vegetables', farmer: 'Harvest Fields', rating: 4.6, image: '🥔' },
    { id: 5, name: 'Sweet Apples', price: 4.00, unit: 'kg', category: 'fruits', farmer: 'Orchard Fresh', rating: 4.9, image: '🍎' },
    { id: 6, name: 'Organic Bananas', price: 2.00, unit: 'kg', category: 'fruits', farmer: 'Tropical Farms', rating: 4.4, image: '🍌' },
    { id: 7, name: 'Green Lentils', price: 3.50, unit: 'kg', category: 'legumes', farmer: 'Pulse Producers', rating: 4.8, image: '🥬' },
    { id: 8, name: 'Red Kidney Beans', price: 3.00, unit: 'kg', category: 'legumes', farmer: 'Bean Barn', rating: 4.6, image: '🫘' },
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and purchase agricultural products from verified farmers
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-64">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiFilter className="mr-2" />
                Filters
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 mb-6">
              <Input
                placeholder="Search products or farmers..."
                icon={FiSearch}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full">
                    <div className="p-6">
                      <div className="text-6xl text-center mb-4">{product.image}</div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        by {product.farmer}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {formatCurrency(product.price)}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">/{product.unit}</span>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-sm ml-1">★</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" icon={FiShoppingCart} fullWidth>
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline" icon={FiHeart}>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No products found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default Marketplace
