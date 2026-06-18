import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiAlertCircle,
  FiCamera,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCloud,
  FiFilter,
  FiMapPin,
  FiMic,
  FiPackage,
  FiSearch,
  FiSend,
  FiShoppingCart,
  FiStar,
  FiUploadCloud,
  FiUser,
} from 'react-icons/fi'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartData, forecast, notifications, products } from '../../data/saisData'

const colorMap = {
  green: 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-800',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800',
  sky: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:ring-sky-800',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800',
  red: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800',
  cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:ring-cyan-800',
}

export const SectionHeader = ({ eyebrow, title, description, centered = false }) => (
  <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-green-600 dark:text-green-400">{eyebrow}</p>}
    <h2 className="text-3xl font-bold text-gray-950 dark:text-white sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">{description}</p>}
  </div>
)

export const DashboardCard = ({ title, value, change, icon: Icon, color = 'green' }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">{value}</p>
      </div>
      {Icon && (
        <div className={`rounded-2xl p-3 ring-1 ${colorMap[color] || colorMap.green}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
    {change !== undefined && (
      <p className={`mt-4 text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? '+' : ''}{change}% from last month
      </p>
    )}
  </motion.div>
)

export const ChartCard = ({ title = 'Analytics', type = 'area', data = chartData, dataKey = 'sales' }) => {
  const Chart = type === 'bar' ? BarChart : type === 'line' ? LineChart : AreaChart
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-950 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Dummy operational trend</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={data}>
            <defs>
              <linearGradient id="saisChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            {type === 'bar' && <Bar dataKey={dataKey} fill="#0284c7" radius={[8, 8, 0, 0]} />}
            {type === 'line' && <Line type="monotone" dataKey={dataKey} stroke="#16a34a" strokeWidth={3} dot={false} />}
            {type === 'area' && <Area type="monotone" dataKey={dataKey} stroke="#16a34a" fill="url(#saisChart)" strokeWidth={3} />}
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <label className="relative block">
    <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 outline-none ring-green-500 transition focus:ring-2 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
    />
  </label>
)

export const FilterPanel = ({ categories, active, onChange }) => (
  <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
    <FiFilter className="h-5 w-5 text-gray-500" />
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onChange(category)}
        className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
          active === category
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
)

export const ProductCard = ({ product }) => (
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-950 dark:text-white">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category} by {product.seller}</p>
        </div>
        <div className="flex items-center gap-1 text-amber-500">
          <FiStar className="h-4 w-4 fill-current" />
          <span className="text-sm font-semibold">{product.rating}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-green-700 dark:text-green-400">৳{product.price}/{product.unit}</p>
          <p className="flex items-center gap-1 text-xs text-gray-500"><FiMapPin /> {product.location}</p>
        </div>
        <button className="rounded-xl bg-green-600 p-3 text-white transition hover:bg-green-700" aria-label="Add to cart">
          <FiShoppingCart className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
)

export const ProductGrid = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = category === 'All' || product.category === category
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
        return matchesCategory && matchesQuery
      }),
    [category, query],
  )

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <SearchBar value={query} onChange={setQuery} placeholder="Search products, sellers, crops..." />
        <FilterPanel categories={categories} active={category} onChange={setCategory} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export const ImageUpload = () => (
  <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
    <div className="rounded-2xl border-2 border-dashed border-green-300 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/10">
      <FiUploadCloud className="mx-auto h-14 w-14 text-green-600" />
      <h3 className="mt-4 text-lg font-semibold text-gray-950 dark:text-white">Drag and drop crop image</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Supports JPG, PNG, and mobile camera captures.</p>
      <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">
        <FiCamera /> Upload Image
      </button>
    </div>
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-green-100 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <FiCheckCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-950 dark:text-white">Detected: Tomato Early Blight</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Confidence score: 92%</p>
        </div>
      </div>
      <div className="mt-5 h-3 rounded-full bg-gray-100 dark:bg-gray-800">
        <div className="h-3 rounded-full bg-green-600" style={{ width: '92%' }} />
      </div>
      <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
        Remove infected leaves, avoid overhead watering, and apply copper-based fungicide every 7 days until symptoms reduce.
      </p>
    </div>
  </div>
)

export const WeatherCard = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {forecast.slice(0, 4).map((item) => (
      <div key={item.day} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-950 dark:text-white">{item.day}</p>
          <FiCloud className="h-6 w-6 text-sky-500" />
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-950 dark:text-white">{item.temp}°C</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.condition} · Rain {item.rain}% · Humidity {item.humidity}%</p>
      </div>
    ))}
  </div>
)

export const ChatbotPanel = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'ai', text: 'Hello! Ask me about crop disease, soil, weather, irrigation, or the marketplace.' },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages((items) => [
      ...items,
      { id: Date.now(), from: 'user', text: input },
      { id: Date.now() + 1, from: 'ai', text: 'Based on your SAIS data, I recommend checking soil moisture and recent weather before applying treatment.' },
    ])
    setInput('')
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <h3 className="font-semibold text-gray-950 dark:text-white">AI Farming Chatbot</h3>
      </div>
      <div className="h-96 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.from === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 border-t border-gray-200 p-4 dark:border-gray-800 sm:grid-cols-[auto_1fr_auto]">
        <button className="rounded-xl bg-blue-50 p-3 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" aria-label="Voice input">
          <FiMic className="h-5 w-5" />
        </button>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && send()}
          placeholder="Ask about crop health..."
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none ring-green-500 focus:ring-2 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
        />
        <button onClick={send} className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">
          <FiSend className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export const NotificationCard = ({ item }) => {
  const tone = item.type === 'warning' ? 'amber' : item.type === 'success' ? 'green' : 'blue'
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex gap-3">
        <div className={`h-fit rounded-xl p-2 ring-1 ${colorMap[tone]}`}>
          {item.type === 'warning' ? <FiAlertCircle /> : <FiCheckCircle />}
        </div>
        <div>
          <h3 className="font-semibold text-gray-950 dark:text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
        </div>
      </div>
    </div>
  )
}

export const NotificationsList = () => (
  <div className="grid gap-4">
    {notifications.map((item) => <NotificationCard key={item.title} item={item} />)}
  </div>
)

export const ProfileCard = ({ role = 'Farmer' }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
        <FiUser className="h-9 w-9" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-950 dark:text-white">SAIS Demo {role}</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{role.toLowerCase()}@sais.local</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Dhaka, Bangladesh · Verified account · Smart agriculture workspace</p>
      </div>
      <button className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Edit Profile</button>
    </div>
  </div>
)

export const Pagination = () => (
  <div className="flex items-center justify-center gap-2">
    <button className="rounded-xl border border-gray-200 p-3 dark:border-gray-800" aria-label="Previous page"><FiChevronLeft /></button>
    {[1, 2, 3].map((page) => (
      <button key={page} className={`rounded-xl px-4 py-2 font-semibold ${page === 1 ? 'bg-green-600 text-white' : 'border border-gray-200 dark:border-gray-800'}`}>
        {page}
      </button>
    ))}
    <button className="rounded-xl border border-gray-200 p-3 dark:border-gray-800" aria-label="Next page"><FiChevronRight /></button>
  </div>
)

export const CropCard = ({ title, subtitle, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
    <div className="flex items-center gap-3">
      <div className="rounded-2xl bg-green-100 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-300">
        <FiPackage className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-950 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
    <p className="mt-4 text-2xl font-bold text-green-700 dark:text-green-400">{value}</p>
  </div>
)
