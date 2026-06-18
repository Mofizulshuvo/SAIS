import React from 'react'
import { motion } from 'framer-motion'
import { FiCreditCard, FiTruck, FiMapPin } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import { formatCurrency } from '../utils/helpers'

const Checkout = () => {
  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'cash_on_delivery', label: 'Cash on Delivery' },
    { value: 'mobile_payment', label: 'Mobile Payment' },
  ]

  const orderSummary = [
    { name: 'Organic Wheat', quantity: 100, price: 250.00 },
    { name: 'Fresh Corn', quantity: 50, price: 90.00 },
    { name: 'Organic Tomatoes', quantity: 30, price: 96.00 },
  ]

  const subtotal = orderSummary.reduce((sum, item) => sum + item.price, 0)
  const shipping = 15.00
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your order details
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FiMapPin className="mr-2" />
                  Shipping Address
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                  <Input label="Address" placeholder="123 Farm Street" className="md:col-span-2" />
                  <Input label="City" placeholder="Farm City" />
                  <Input label="State" placeholder="FC" />
                  <Input label="ZIP Code" placeholder="12345" />
                  <Input label="Phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FiTruck className="mr-2" />
                  Delivery Options
                </h2>
                <div className="space-y-4">
                  {[
                    { id: 1, name: 'Standard Delivery', duration: '5-7 business days', price: 15.00 },
                    { id: 2, name: 'Express Delivery', duration: '2-3 business days', price: 25.00 },
                    { id: 3, name: 'Same Day Delivery', duration: 'Today', price: 45.00 },
                  ].map((option) => (
                    <label key={option.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                      <div className="flex items-center space-x-3">
                        <input type="radio" name="delivery" className="w-4 h-4 text-primary-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{option.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{option.duration}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(option.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FiCreditCard className="mr-2" />
                  Payment Method
                </h2>
                <Select
                  label="Select Payment Method"
                  placeholder="Choose payment method"
                  options={paymentMethods}
                />
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {orderSummary.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (8%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <Button size="lg" fullWidth>
                  Place Order
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default Checkout
