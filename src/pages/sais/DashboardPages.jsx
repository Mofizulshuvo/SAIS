import React, { useEffect, useState } from 'react'
import { FiDownload, FiPlus, FiSend, FiTrash2, FiUploadCloud } from 'react-icons/fi'
import { getAdminOrders, getAdminStats, getAdminUsers } from '../../api/adminApi'
import { sendMessage, getChatHistory } from '../../api/chatbotApi'
import { getCropRecommendations } from '../../api/cropApi'
import { deleteDiseaseRecord, detectDisease, getDiseaseHistory } from '../../api/diseaseApi'
import { getIrrigationRecommendation } from '../../api/irrigationApi'
import { createOrder, createProduct, getOrders, getProducts } from '../../api/marketplaceApi'
import { analyzeSoil, getSoilAnalysisHistory } from '../../api/soilApi'
import { getCurrentWeather, getWeatherForecast, getWeatherHistory } from '../../api/weatherApi'
import { getUserProfile, updateProfile } from '../../api/authApi'
import { chartData, dashboardStats } from '../../data/saisData'
import { ChartCard, CropCard, DashboardCard, SectionHeader } from '../../components/sais/SAISComponents'

const titleMap = {
  'disease-detection': 'Plant Disease Detection',
  'soil-analysis': 'Soil Analysis',
  'weather-prediction': 'Weather Prediction',
  'smart-irrigation': 'Smart Irrigation',
  'crop-recommendation': 'Crop Recommendation',
  chatbot: 'AI Farming Chatbot',
  marketplace: 'Marketplace',
  'my-products': 'My Products',
  'add-product': 'Add Product',
  orders: 'Orders',
  notifications: 'Notifications',
  settings: 'Settings',
  profile: 'Profile',
  users: 'User Management',
  'disease-monitoring': 'Disease Monitoring',
  'soil-reports': 'Soil Analysis Reports',
  'crop-analytics': 'Crop Analytics',
  payments: 'Payment Management',
  'reports-export': 'Reports and Export',
  'system-settings': 'System Settings',
}

const descriptions = {
  farmer: 'Manage crop intelligence, AI reports, product sales, alerts, and farm decisions.',
  admin: 'Monitor users, reports, marketplace operations, orders, and exports.',
}

const unwrap = (response) => response?.data?.data || {}
const messageFrom = (error, fallback) => error?.response?.data?.message || error?.message || fallback

const cxInput = 'rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-800 dark:bg-gray-950 dark:text-white'
const cxButton = 'inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60'
const cxPanel = 'rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'

export const RoleDashboardPage = ({ role }) => {
  const [stats, setStats] = useState(dashboardStats[role] || dashboardStats.farmer)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setError('')
      try {
        if (role === 'admin') {
          const { stats: adminStats } = unwrap(await getAdminStats())
          if (!mounted || !adminStats) return
          setStats([
            { title: 'Total Users', value: adminStats.usersCount, change: 0, color: 'green' },
            { title: 'Products', value: adminStats.productsCount, change: 0, color: 'blue' },
            { title: 'Orders', value: adminStats.ordersCount, change: 0, color: 'amber' },
          ])
          return
        }

        const [disease, soil, weather, products, orders] = await Promise.allSettled([
          getDiseaseHistory({ limit: 1 }),
          getSoilAnalysisHistory({ limit: 1 }),
          getWeatherHistory({ limit: 1 }),
          getProducts(),
          getOrders(),
        ])

        if (!mounted) return
        setStats([
          { title: 'Disease Reports', value: disease.value?.data?.meta?.total ?? 0, change: 0, color: 'red' },
          { title: 'Soil Reports', value: soil.value?.data?.meta?.total ?? 0, change: 0, color: 'blue' },
          { title: 'Weather Records', value: weather.value?.data?.meta?.total ?? 0, change: 0, color: 'sky' },
          { title: 'Products', value: unwrap(products.value).products?.length ?? 0, change: 0, color: 'green' },
          { title: 'Orders', value: unwrap(orders.value).orders?.length ?? 0, change: 0, color: 'emerald' },
        ])
      } catch (error) {
        if (mounted) setError(messageFrom(error, 'Failed to load dashboard'))
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [role])

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow={`${role} dashboard`} title={`${capitalize(role)} Dashboard`} description={descriptions[role]} />
      {error && <Notice tone="error">{error}</Notice>}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {stats.map((stat) => <DashboardCard key={stat.title} {...stat} />)}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <ChartCard title={role === 'admin' ? 'Platform Analytics' : 'Farm Activity'} data={chartData} dataKey={role === 'admin' ? 'users' : 'reports'} />
        <ActivityPanel role={role} />
      </div>
    </div>
  )
}

export const DashboardFeaturePage = ({ role, type }) => {
  const title = titleMap[type] || titleCase(type)

  if (type === 'disease-detection') return <FeatureShell role={role} title={title}><DiseasePanel /></FeatureShell>
  if (type === 'soil-analysis' || type === 'soil-reports') return <FeatureShell role={role} title={title}><SoilPanel admin={role === 'admin'} /></FeatureShell>
  if (type === 'weather-prediction') return <FeatureShell role={role} title={title}><WeatherPanel /></FeatureShell>
  if (type === 'smart-irrigation') return <FeatureShell role={role} title={title}><IrrigationPanel /></FeatureShell>
  if (type === 'crop-recommendation' || type === 'crop-analytics') return <FeatureShell role={role} title={title}><CropPanel /></FeatureShell>
  if (type === 'chatbot') return <FeatureShell role={role} title={title}><ChatPanel /></FeatureShell>
  if (type === 'marketplace') return <FeatureShell role={role} title={title}><MarketplacePanel /></FeatureShell>
  if (type === 'add-product') return <FeatureShell role={role} title={title}><ProductForm /></FeatureShell>
  if (type === 'orders') return <FeatureShell role={role} title={title}><OrdersPanel admin={role === 'admin'} /></FeatureShell>
  if (type === 'profile') return <FeatureShell role={role} title={title}><ProfilePanel /></FeatureShell>
  if (type === 'users') return <FeatureShell role={role} title={title}><UsersPanel /></FeatureShell>
  if (type === 'disease-monitoring') return <FeatureShell role={role} title={title}><DiseaseMonitoringPanel /></FeatureShell>
  if (type === 'payments' || type === 'notifications' || type === 'reports-export' || type === 'system-settings' || type === 'settings') {
    return <FeatureShell role={role} title={title}><UnsupportedPanel title={title} /></FeatureShell>
  }

  return <FeatureShell role={role} title={title}><UnsupportedPanel title={title} /></FeatureShell>
}

const FeatureShell = ({ role, title, children }) => (
  <div className="space-y-8">
    <SectionHeader eyebrow={role} title={title} description="Connected to the backend API contract from BACKEND_MAP.md." />
    {children}
  </div>
)

const ActivityPanel = ({ role }) => (
  <div className={cxPanel}>
    <h3 className="text-lg font-semibold text-gray-950 dark:text-white">Backend Integration</h3>
    <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
      <p>Role: {role}</p>
      <p>Auth: Bearer token from the backend login/register response.</p>
      <p>Source of truth: Express controllers and MongoDB models listed in BACKEND_MAP.md.</p>
    </div>
  </div>
)

const DiseasePanel = () => {
  const [file, setFile] = useState(null)
  const [report, setReport] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadHistory = async () => {
    const data = unwrap(await getDiseaseHistory({ limit: 10 }))
    setReports(data.reports || [])
  }

  useEffect(() => {
    loadHistory().catch((error) => setError(messageFrom(error, 'Failed to load disease history')))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    if (!file) return setError('Select an image first')
    setLoading(true)
    setError('')
    try {
      const data = unwrap(await detectDisease(file))
      setReport(data.report)
      await loadHistory()
    } catch (error) {
      setError(messageFrom(error, 'Disease prediction failed'))
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id) => {
    setError('')
    try {
      await deleteDiseaseRecord(id)
      await loadHistory()
    } catch (error) {
      setError(messageFrom(error, 'Failed to delete report'))
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={submit} className={cxPanel}>
        <h3 className="font-semibold text-gray-950 dark:text-white">Upload Plant Image</h3>
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-300 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/10">
          <FiUploadCloud className="h-12 w-12 text-green-600" />
          <span className="mt-3 text-sm text-gray-600 dark:text-gray-300">{file?.name || 'JPEG, PNG, or WEBP, max 5MB'}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        </label>
        {error && <Notice tone="error">{error}</Notice>}
        <button className={`${cxButton} mt-5 w-full`} disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Image'}</button>
      </form>

      <div className="space-y-5">
        {report && (
          <div className={cxPanel}>
            <h3 className="font-semibold text-gray-950 dark:text-white">{report.prediction}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Confidence: {Math.round((report.confidence || 0) * 100)}%</p>
            {report.imageUrl && <img src={report.imageUrl} alt={report.prediction} className="mt-4 max-h-72 w-full rounded-xl object-cover" />}
            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{Array.isArray(report.treatment) ? report.treatment.join(' ') : report.treatment}</p>
          </div>
        )}
        <RecordList
          title="Detection History"
          empty="No disease reports yet."
          items={reports}
          render={(item) => (
            <div key={item._id} className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <div>
                <p className="font-semibold text-gray-950 dark:text-white">{item.prediction}</p>
                <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <button className="rounded-lg p-2 text-red-600 hover:bg-red-50" onClick={() => remove(item._id)} aria-label="Delete disease report"><FiTrash2 /></button>
            </div>
          )}
        />
      </div>
    </div>
  )
}

const SoilPanel = ({ admin = false }) => {
  const [form, setForm] = useState({ nitrogen: '', phosphorus: '', potassium: '', ph: '', moisture: '', cropType: '', location: '' })
  const [record, setRecord] = useState(null)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadHistory = async () => {
    const data = unwrap(await getSoilAnalysisHistory({ limit: 10 }))
    setRecords(data.records || [])
  }

  useEffect(() => {
    loadHistory().catch((error) => setError(messageFrom(error, 'Failed to load soil history')))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = unwrap(await analyzeSoil(form))
      setRecord(data.record)
      await loadHistory()
    } catch (error) {
      setError(messageFrom(error, 'Soil analysis failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      {!admin && (
        <ApiForm title="Soil Input" onSubmit={submit} loading={loading} error={error} submitLabel="Analyze Soil">
          {['nitrogen', 'phosphorus', 'potassium', 'ph', 'moisture', 'cropType', 'location'].map((field) => (
            <TextField key={field} field={field} value={form[field]} onChange={(value) => setForm({ ...form, [field]: value })} />
          ))}
        </ApiForm>
      )}
      <div className={admin ? 'xl:col-span-2' : ''}>
        {record && (
          <div className={`${cxPanel} mb-5`}>
            <h3 className="font-semibold text-gray-950 dark:text-white">Latest Result</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <CropCard title="Health Score" subtitle={record.analysis?.fertilityLevel || 'fertility'} value={`${record.analysis?.healthScore ?? 0}/100`} />
              <CropCard title="Recommendation" subtitle="Backend result" value={Array.isArray(record.recommendation) ? record.recommendation[0] : record.recommendation || 'N/A'} />
            </div>
          </div>
        )}
        <RecordList
          title={admin ? 'All Soil Reports' : 'Soil History'}
          empty="No soil records yet."
          items={records}
          render={(item) => (
            <div key={item._id} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <p className="font-semibold text-gray-950 dark:text-white">Score {item.analysis?.healthScore ?? 0}/100 - {item.analysis?.fertilityLevel || 'unknown'}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">pH {item.input?.ph}, N {item.input?.nitrogen}, P {item.input?.phosphorus}, K {item.input?.potassium}</p>
            </div>
          )}
        />
      </div>
    </div>
  )
}

const WeatherPanel = () => {
  const [form, setForm] = useState({ lat: '', lon: '', name: '', days: '7' })
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getWeatherHistory({ limit: 5 }).then((response) => setHistory(unwrap(response).records || [])).catch(() => {})
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const location = { lat: form.lat, lon: form.lon, name: form.name }
      const [currentResponse, forecastResponse] = await Promise.all([
        getCurrentWeather(location),
        getWeatherForecast(location, form.days),
      ])
      setCurrent(unwrap(currentResponse).record)
      setForecast(unwrap(forecastResponse).record)
      const historyResponse = await getWeatherHistory({ limit: 5 })
      setHistory(unwrap(historyResponse).records || [])
    } catch (error) {
      setError(messageFrom(error, 'Weather request failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <ApiForm title="Weather Location" onSubmit={submit} loading={loading} error={error} submitLabel="Get Weather">
        <TextField field="lat" label="Latitude" value={form.lat} onChange={(value) => setForm({ ...form, lat: value })} />
        <TextField field="lon" label="Longitude" value={form.lon} onChange={(value) => setForm({ ...form, lon: value })} />
        <TextField field="name" label="Location Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
        <TextField field="days" label="Forecast Days" value={form.days} onChange={(value) => setForm({ ...form, days: value })} />
      </ApiForm>
      {current && (
        <div className="grid gap-4 md:grid-cols-4">
          <CropCard title="Temperature" subtitle={current.location?.name || 'Current'} value={`${current.weather?.temperature ?? 0} C`} />
          <CropCard title="Humidity" subtitle="Current" value={`${current.weather?.humidity ?? 0}%`} />
          <CropCard title="Wind" subtitle="Speed" value={`${current.weather?.windSpeed ?? 0}`} />
          <CropCard title="Forecast Days" subtitle="Loaded" value={forecast?.weather?.days?.length ?? 0} />
        </div>
      )}
      <RecordList
        title="Weather History"
        empty="No weather records yet."
        items={history}
        render={(item) => (
          <div key={item._id} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-semibold text-gray-950 dark:text-white">{item.type} - {item.location?.name || `${item.location?.latitude}, ${item.location?.longitude}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(item.createdAt).toLocaleString()}</p>
          </div>
        )}
      />
    </div>
  )
}

const IrrigationPanel = () => {
  const [form, setForm] = useState({ soilMoisture: '', temperature: '', humidity: '', rainfall: '', area: '', cropType: '', soilType: 'loamy', growthStage: 'vegetative', location: '' })
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      setRecord(unwrap(await getIrrigationRecommendation(form)).record)
    } catch (error) {
      setError(messageFrom(error, 'Irrigation recommendation failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <ApiForm title="Irrigation Input" onSubmit={submit} loading={loading} error={error} submitLabel="Recommend Irrigation">
        {Object.keys(form).map((field) => (
          <TextField key={field} field={field} value={form[field]} onChange={(value) => setForm({ ...form, [field]: value })} />
        ))}
      </ApiForm>
      {record ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <CropCard title="Should Irrigate" subtitle="Backend recommendation" value={record.recommendation?.shouldIrrigate ? 'Yes' : 'No'} />
          <CropCard title="Water Need" subtitle="Millimeters" value={`${record.recommendation?.waterNeedMm ?? 0} mm`} />
          <CropCard title="Water Liters" subtitle="Estimated" value={`${record.recommendation?.waterLiters ?? 0} L`} />
          <CropCard title="Priority" subtitle="Schedule" value={record.recommendation?.priority || 'N/A'} />
          <div className={`${cxPanel} sm:col-span-2 text-sm leading-6 text-gray-600 dark:text-gray-300`}>{record.recommendation?.recommendation}</div>
        </div>
      ) : <EmptyPanel text="Submit field conditions to generate a backend irrigation recommendation." />}
    </div>
  )
}

const CropPanel = () => {
  const [form, setForm] = useState({ nitrogen: '', phosphorus: '', potassium: '', ph: '', temperature: '', rainfall: '', humidity: '', soilType: '', season: '', location: '' })
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      setRecord(unwrap(await getCropRecommendations(form)).record)
    } catch (error) {
      setError(messageFrom(error, 'Crop recommendation failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <ApiForm title="Crop Conditions" onSubmit={submit} loading={loading} error={error} submitLabel="Recommend Crops">
        {Object.keys(form).map((field) => (
          <TextField key={field} field={field} value={form[field]} onChange={(value) => setForm({ ...form, [field]: value })} />
        ))}
      </ApiForm>
      <RecordList
        title="Recommended Crops"
        empty="No recommendations yet."
        items={record?.recommendations || []}
        render={(item) => (
          <div key={item.crop} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-semibold text-gray-950 dark:text-white">{item.crop} - {item.suitabilityScore}%</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.reason}</p>
          </div>
        )}
      />
    </div>
  )
}

const ChatPanel = () => {
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadHistory = async () => {
    setChats(unwrap(await getChatHistory()).chats || [])
  }

  useEffect(() => {
    loadHistory().catch((error) => setError(messageFrom(error, 'Failed to load chat history')))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    if (!message.trim()) return
    setLoading(true)
    setError('')
    try {
      await sendMessage(message)
      setMessage('')
      await loadHistory()
    } catch (error) {
      setError(messageFrom(error, 'Failed to send message'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className={`${cxPanel} grid gap-3 sm:grid-cols-[1fr_auto]`}>
        <input className={cxInput} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask the agriculture assistant..." />
        <button className={cxButton} disabled={loading}><FiSend /> Send</button>
      </form>
      {error && <Notice tone="error">{error}</Notice>}
      <RecordList
        title="Chat History"
        empty="No chat history yet."
        items={chats}
        render={(chat) => (
          <div key={chat._id} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-semibold text-gray-950 dark:text-white">{chat.question}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{chat.answer}</p>
          </div>
        )}
      />
    </div>
  )
}

const MarketplacePanel = () => {
  const [filters, setFilters] = useState({ q: '', category: '' })
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (filters.q) params.q = filters.q
      if (filters.category) params.category = filters.category
      setProducts(unwrap(await getProducts(params)).products || [])
    } catch (error) {
      setError(messageFrom(error, 'Failed to load products'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((item) => item._id === product._id)
    const next = existing
      ? cart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }]
    localStorage.setItem('cart', JSON.stringify(next))
  }

  return (
    <div className="space-y-5">
      <div className={`${cxPanel} grid gap-3 md:grid-cols-[1fr_220px_auto]`}>
        <input className={cxInput} value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} placeholder="Search products..." />
        <input className={cxInput} value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })} placeholder="Category" />
        <button className={cxButton} onClick={load} disabled={loading}>Search</button>
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product._id} className={cxPanel}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="mb-4 h-44 w-full rounded-xl object-cover" />}
            <h3 className="font-semibold text-gray-950 dark:text-white">{product.name}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xl font-bold text-green-700 dark:text-green-400">{product.price}</p>
              <button className={cxButton} onClick={() => addToCart(product)}>Add</button>
            </div>
          </div>
        ))}
      </div>
      {!loading && products.length === 0 && <EmptyPanel text="No products found." />}
    </div>
  )
}

const ProductForm = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'general', stock: '' })
  const [image, setImage] = useState(null)
  const [created, setCreated] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, value]) => data.append(key, value))
      if (image) data.append('image', image)
      setCreated(unwrap(await createProduct(data)).product)
      setForm({ name: '', description: '', price: '', category: 'general', stock: '' })
      setImage(null)
    } catch (error) {
      setError(messageFrom(error, 'Product create failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <ApiForm title="Create Product" onSubmit={submit} loading={loading} error={error} submitLabel="Create Product">
      {Object.keys(form).map((field) => (
        <TextField key={field} field={field} value={form[field]} onChange={(value) => setForm({ ...form, [field]: value })} />
      ))}
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setImage(event.target.files?.[0] || null)} className={cxInput} />
      {created && <Notice>Created product: {created.name}</Notice>}
    </ApiForm>
  )
}

const OrdersPanel = ({ admin = false }) => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const request = admin ? getAdminOrders : getOrders
    request()
      .then((response) => setOrders(unwrap(response).orders || []))
      .catch((error) => setError(messageFrom(error, 'Failed to load orders')))
  }, [admin])

  return (
    <>
      {error && <Notice tone="error">{error}</Notice>}
      <RecordList
        title={admin ? 'All Orders' : 'My Orders'}
        empty="No orders yet."
        items={orders}
        render={(order) => (
          <div key={order._id} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-semibold text-gray-950 dark:text-white">Order {String(order._id).slice(-8)} - {order.status}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{order.items?.length || 0} items, total {order.totalAmount}</p>
          </div>
        )}
      />
    </>
  )
}

const ProfilePanel = () => {
  const [form, setForm] = useState({ name: '', email: '', profileImage: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        const user = unwrap(response).user
        setForm({ name: user?.name || '', email: user?.email || '', profileImage: user?.profileImage || '', password: '' })
      })
      .catch((error) => setError(messageFrom(error, 'Failed to load profile')))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const payload = { name: form.name, email: form.email, profileImage: form.profileImage || null }
      if (form.password) payload.password = form.password
      const user = unwrap(await updateProfile(payload)).user
      setForm({ name: user?.name || '', email: user?.email || '', profileImage: user?.profileImage || '', password: '' })
      setSuccess('Profile updated')
    } catch (error) {
      setError(messageFrom(error, 'Profile update failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <ApiForm title="Profile" onSubmit={submit} loading={loading} error={error} submitLabel="Save Profile">
      {['name', 'email', 'profileImage', 'password'].map((field) => (
        <TextField key={field} field={field} type={field === 'password' ? 'password' : 'text'} value={form[field]} onChange={(value) => setForm({ ...form, [field]: value })} />
      ))}
      {success && <Notice>{success}</Notice>}
    </ApiForm>
  )
}

const UsersPanel = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminUsers()
      .then((response) => setUsers(unwrap(response).users || []))
      .catch((error) => setError(messageFrom(error, 'Failed to load users')))
  }, [])

  return (
    <>
      {error && <Notice tone="error">{error}</Notice>}
      <RecordList
        title="Users"
        empty="No users found."
        items={users}
        render={(user) => (
          <div key={user._id} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-semibold text-gray-950 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email} - {user.role}</p>
          </div>
        )}
      />
    </>
  )
}

const DiseaseMonitoringPanel = () => {
  const [reports, setReports] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getDiseaseHistory({ limit: 20 })
      .then((response) => setReports(unwrap(response).reports || []))
      .catch((error) => setError(messageFrom(error, 'Failed to load disease reports')))
  }, [])

  return (
    <>
      {error && <Notice tone="error">{error}</Notice>}
      <RecordList
        title="Disease Reports"
        empty="No reports found."
        items={reports}
        render={(report) => (
          <div key={report._id} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-semibold text-gray-950 dark:text-white">{report.prediction}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Confidence {Math.round((report.confidence || 0) * 100)}%</p>
          </div>
        )}
      />
    </>
  )
}

const UnsupportedPanel = ({ title }) => (
  <div className={cxPanel}>
    <h3 className="font-semibold text-gray-950 dark:text-white">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
      No backend route exists for this feature in BACKEND_MAP.md. It is preserved as a UI placeholder until a backend contract is added.
    </p>
    {title.includes('Export') && <button className={`${cxButton} mt-5`} disabled><FiDownload /> Export unavailable</button>}
  </div>
)

const ApiForm = ({ title, children, onSubmit, loading, error, submitLabel }) => (
  <form onSubmit={onSubmit} className={cxPanel}>
    <h3 className="font-semibold text-gray-950 dark:text-white">{title}</h3>
    <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    {error && <Notice tone="error">{error}</Notice>}
    <button className={`${cxButton} mt-5`} disabled={loading}>{loading ? 'Working...' : submitLabel}</button>
  </form>
)

const TextField = ({ field, label, type = 'text', value, onChange }) => (
  <label className="block text-sm font-medium capitalize text-gray-700 dark:text-gray-200">
    {label || field.replace(/([A-Z])/g, ' $1')}
    <input className={`${cxInput} mt-2 w-full`} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
  </label>
)

const RecordList = ({ title, empty, items, render }) => (
  <div className={cxPanel}>
    <h3 className="font-semibold text-gray-950 dark:text-white">{title}</h3>
    <div className="mt-5 grid gap-3">
      {items.length > 0 ? items.map(render) : <p className="text-sm text-gray-500 dark:text-gray-400">{empty}</p>}
    </div>
  </div>
)

const EmptyPanel = ({ text }) => (
  <div className={`${cxPanel} flex min-h-48 items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400`}>
    {text}
  </div>
)

const Notice = ({ children, tone = 'success' }) => (
  <div className={`mt-4 rounded-xl p-3 text-sm ${tone === 'error' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'}`}>
    {children}
  </div>
)

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)
const titleCase = (value) => value.split('-').map(capitalize).join(' ')
