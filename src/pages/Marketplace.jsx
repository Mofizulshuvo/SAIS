import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiShoppingCart, FiHeart } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { formatCurrency } from '../utils/helpers'
import { getProducts } from '../api/marketplaceApi'
import toast from 'react-hot-toast'

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cereals', name: 'Cereals' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'legumes', name: 'Legumes' },
  ]

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (searchTerm) params.q = searchTerm
      if (selectedCategory !== 'all') params.category = selectedCategory

      const response = await getProducts(params)
      if (response.data.success) {
        setProducts(response.data.data.products)
      }
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory])

  const addToCart = (product) => {
    const savedCart = localStorage.getItem('cart')
    let cart = savedCart ? JSON.parse(savedCart) : []
    
    const existingItem = cart.find(item => item._id === product._id)
    if (existingItem) {
      cart = cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success(`${product.name} added to cart`)
  }

  const filteredProducts = products

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

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full">
                      <div className="p-6">
                        {product.imageUrl && (
                          <div className="mb-4">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Stock: {product.stock}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" icon={FiShoppingCart} fullWidth onClick={() => addToCart(product)}>
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
            )}

            {!loading && filteredProducts.length === 0 && (
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
