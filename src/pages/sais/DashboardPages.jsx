import React from 'react'
import { FiCalendar, FiCheckCircle, FiDownload, FiPlus, FiTruck } from 'react-icons/fi'
import {
  activities,
  chartData,
  dashboardStats,
  featureCards,
  forecast,
  learningModules,
  products,
} from '../../data/saisData'
import {
  ChartCard,
  ChatbotPanel,
  CropCard,
  DashboardCard,
  ImageUpload,
  NotificationsList,
  Pagination,
  ProductGrid,
  ProfileCard,
  SectionHeader,
  WeatherCard,
} from '../../components/sais/SAISComponents'

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
  'product-details': 'Product Details',
  cart: 'Shopping Cart',
  checkout: 'Checkout',
  'order-tracking': 'Order Tracking',
  wishlist: 'Wishlist',
  'learning-center': 'Agriculture Learning Center',
  'disease-knowledge': 'Disease Knowledge Base',
  'soil-module': 'Soil Learning Module',
  'weather-module': 'Weather Learning Module',
  'chat-assistant': 'AI Chat Assistant',
  'saved-articles': 'Saved Articles',
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
  buyer: 'Discover verified products, manage carts, checkout, wishlist, and order tracking.',
  student: 'Learn agriculture concepts, save articles, and ask the AI study assistant.',
  admin: 'Monitor users, reports, marketplace operations, revenue, payments, and exports.',
}

export const RoleDashboardPage = ({ role }) => (
  <div className="space-y-8">
    <SectionHeader eyebrow={`${role} dashboard`} title={`${capitalize(role)} Dashboard`} description={descriptions[role]} />
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      {dashboardStats[role].map((stat) => <DashboardCard key={stat.title} {...stat} />)}
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <ChartCard title={role === 'admin' ? 'Platform Analytics' : 'Monthly Performance'} dataKey={role === 'admin' ? 'users' : 'sales'} />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-950 dark:text-white">Recent Activities</h3>
        <div className="mt-5 space-y-4">
          {activities.map((activity) => (
            <div key={activity} className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-600" />
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    {role === 'admin' && (
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Disease Reports" type="bar" dataKey="reports" />
        <ChartCard title="Revenue Growth" type="line" dataKey="sales" />
      </div>
    )}
  </div>
)

export const DashboardFeaturePage = ({ role, type }) => {
  const title = titleMap[type] || titleCase(type)

  if (type === 'disease-detection') return <FeatureShell role={role} title={title}><ImageUpload /><HistoryTable /></FeatureShell>
  if (type === 'soil-analysis' || type === 'soil-reports') return <FeatureShell role={role} title={title}><SoilAnalysisPanel admin={role === 'admin'} /></FeatureShell>
  if (type === 'weather-prediction' || type === 'weather-module') return <FeatureShell role={role} title={title}><WeatherPanel /></FeatureShell>
  if (type === 'smart-irrigation') return <FeatureShell role={role} title={title}><IrrigationPanel /></FeatureShell>
  if (type === 'crop-recommendation' || type === 'crop-analytics') return <FeatureShell role={role} title={title}><CropRecommendationPanel admin={role === 'admin'} /></FeatureShell>
  if (type === 'chatbot' || type === 'chat-assistant') return <FeatureShell role={role} title={title}><ChatbotPanel /></FeatureShell>
  if (type === 'marketplace') return <FeatureShell role={role} title={title}><ProductGrid /><Pagination /></FeatureShell>
  if (type === 'notifications') return <FeatureShell role={role} title={title}><NotificationsList /></FeatureShell>
  if (type === 'profile') return <FeatureShell role={role} title={title}><ProfileCard role={capitalize(role)} /></FeatureShell>
  if (type === 'my-products' || type === 'wishlist') return <FeatureShell role={role} title={title}><ProductListPanel type={type} /></FeatureShell>
  if (type === 'add-product') return <FeatureShell role={role} title={title}><ProductForm /></FeatureShell>
  if (type === 'orders' || type === 'order-tracking') return <FeatureShell role={role} title={title}><OrdersPanel /></FeatureShell>
  if (type === 'product-details') return <FeatureShell role={role} title={title}><ProductDetailsPanel /></FeatureShell>
  if (type === 'cart') return <FeatureShell role={role} title={title}><CartPanel /></FeatureShell>
  if (type === 'checkout') return <FeatureShell role={role} title={title}><CheckoutPanel /></FeatureShell>
  if (type === 'learning-center' || type === 'disease-knowledge' || type === 'saved-articles') return <FeatureShell role={role} title={title}><LearningPanel type={type} /></FeatureShell>
  if (type === 'users') return <FeatureShell role={role} title={title}><UsersPanel /></FeatureShell>
  if (type === 'disease-monitoring') return <FeatureShell role={role} title={title}><DiseaseMonitoringPanel /></FeatureShell>
  if (type === 'payments') return <FeatureShell role={role} title={title}><PaymentsPanel /></FeatureShell>
  if (type === 'reports-export') return <FeatureShell role={role} title={title}><ReportsExportPanel /></FeatureShell>

  return <FeatureShell role={role} title={title}><SettingsPanel title={title} /></FeatureShell>
}

const FeatureShell = ({ role, title, children }) => (
  <div className="space-y-8">
    <SectionHeader eyebrow={role} title={title} description="Complete responsive dummy UI ready for API integration, charts, cards, actions, and role-aware navigation." />
    {children}
  </div>
)

const SoilAnalysisPanel = ({ admin = false }) => (
  <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="font-semibold text-gray-950 dark:text-white">{admin ? 'Report Filters' : 'Soil Input Form'}</h3>
      <div className="mt-5 grid gap-4">
        {['pH', 'Nitrogen', 'Phosphorus', 'Potassium', 'Moisture'].map((field) => (
          <label key={field} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {field}
            <input className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder={`Enter ${field}`} />
          </label>
        ))}
        <button className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Analyze Soil</button>
      </div>
    </div>
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CropCard title="Soil Health" subtitle="Balanced loam" value="82/100" />
        <CropCard title="Recommendation" subtitle="Fertilizer plan" value="NPK 10-20-20" />
      </div>
      <ChartCard title="Nutrient Levels" type="bar" data={chartData} dataKey="crops" />
    </div>
  </div>
)

const WeatherPanel = () => (
  <div className="space-y-5">
    <WeatherCard />
    <div className="grid gap-5 lg:grid-cols-2">
      <ChartCard title="Temperature Chart" type="line" data={forecast.map((item) => ({ name: item.day, sales: item.temp }))} dataKey="sales" />
      <ChartCard title="Humidity Chart" type="area" data={forecast.map((item) => ({ name: item.day, sales: item.humidity }))} dataKey="sales" />
    </div>
  </div>
)

const IrrigationPanel = () => (
  <div className="grid gap-5 lg:grid-cols-3">
    <CropCard title="Water Requirement" subtitle="Rice field block B" value="34 mm" />
    <CropCard title="Next Schedule" subtitle="Based on weather" value="Tomorrow 6 AM" />
    <CropCard title="Alert" subtitle="Rain likely soon" value="Delay 24h" />
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:col-span-3">
      <h3 className="font-semibold text-gray-950 dark:text-white">Crop Based Suggestions</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {['Rice: shallow flooding', 'Tomato: drip irrigation', 'Mango: deep watering'].map((item) => <div key={item} className="rounded-xl bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-200">{item}</div>)}
      </div>
    </div>
  </div>
)

const CropRecommendationPanel = ({ admin = false }) => (
  <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="font-semibold text-gray-950 dark:text-white">{admin ? 'Crop Analytics Filters' : 'Recommendation Input Form'}</h3>
      <div className="mt-5 grid gap-4">
        {['Soil Type', 'Season', 'Location'].map((field) => (
          <select key={field} className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white">
            <option>{field}</option>
            <option>Loam</option>
            <option>Monsoon</option>
            <option>Rajshahi</option>
          </select>
        ))}
        <button className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Recommend Crops</button>
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      <CropCard title="Rice" subtitle="Best match" value="4.8 t/ha" />
      <CropCard title="Maize" subtitle="High yield" value="6.2 t/ha" />
      <CropCard title="Tomato" subtitle="Market value" value="৳130k" />
    </div>
  </div>
)

const ProductListPanel = ({ type }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {products.slice(0, type === 'wishlist' ? 4 : 6).map((product) => (
      <CropCard key={product.id} title={product.name} subtitle={`${product.seller} · ${product.stock} in stock`} value={`৳${product.price}/${product.unit}`} />
    ))}
  </div>
)

const ProductForm = () => (
  <form className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
    <div className="grid gap-4 md:grid-cols-2">
      {['Product Name', 'Category', 'Price', 'Stock', 'Location', 'Image URL'].map((field) => (
        <input key={field} className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder={field} />
      ))}
    </div>
    <textarea className="mt-4 h-32 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="Product description" />
    <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"><FiPlus /> Add Product</button>
  </form>
)

const OrdersPanel = () => (
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
    {['SAIS-2041', 'SAIS-2042', 'SAIS-2043', 'SAIS-2044'].map((order, index) => (
      <div key={order} className="grid gap-3 border-b border-gray-100 p-5 last:border-b-0 dark:border-gray-800 md:grid-cols-4 md:items-center">
        <p className="font-semibold text-gray-950 dark:text-white">#{order}</p>
        <p className="text-gray-600 dark:text-gray-300">{products[index]?.name}</p>
        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><FiTruck /> {index % 2 ? 'Processing' : 'In transit'}</p>
        <button className="rounded-xl bg-green-50 px-4 py-2 font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-300">Track</button>
      </div>
    ))}
  </div>
)

const ProductDetailsPanel = () => {
  const product = products[0]
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-3xl object-cover" />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-600">{product.category}</p>
        <h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">{product.name}</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">Sold by {product.seller} from {product.location}. Fresh, graded, and ready for delivery.</p>
        <p className="mt-6 text-3xl font-bold text-green-700 dark:text-green-400">৳{product.price}/{product.unit}</p>
        <button className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">Add to Cart</button>
      </div>
    </div>
  )
}

const CartPanel = () => (
  <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
    <OrdersPanel />
    <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="font-semibold text-gray-950 dark:text-white">Cart Summary</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Subtotal: ৳4,850</p>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Delivery: ৳120</p>
      <p className="mt-4 text-2xl font-bold text-gray-950 dark:text-white">Total: ৳4,970</p>
      <button className="mt-5 w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Proceed to Checkout</button>
    </div>
  </div>
)

const CheckoutPanel = () => (
  <div className="grid gap-5 lg:grid-cols-2">
    {['Shipping Address', 'Payment Method'].map((section) => (
      <div key={section} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="font-semibold text-gray-950 dark:text-white">{section}</h3>
        <div className="mt-5 grid gap-4">
          <input className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="Name or card details" />
          <input className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="Address or transaction ID" />
          <button className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Confirm</button>
        </div>
      </div>
    ))}
  </div>
)

const LearningPanel = ({ type }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    {learningModules.map((module) => {
      const Icon = module.icon
      return (
        <div key={module.title} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <Icon className="h-8 w-8 text-green-600" />
          <h3 className="mt-5 font-semibold text-gray-950 dark:text-white">{type === 'saved-articles' ? `Saved: ${module.title}` : module.title}</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{module.level} · {module.lessons} lessons</p>
        </div>
      )
    })}
  </div>
)

const UsersPanel = () => (
  <div className="grid gap-4">
    {['Farmer Md. Karim', 'Buyer Nusrat Jahan', 'Student Ariyan Islam', 'Admin Demo User'].map((user) => (
      <div key={user} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div>
          <p className="font-semibold text-gray-950 dark:text-white">{user}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Verified · Active this week</p>
        </div>
        <button className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">Manage</button>
      </div>
    ))}
  </div>
)

const DiseaseMonitoringPanel = () => (
  <div className="grid gap-5 lg:grid-cols-2">
    <ChartCard title="Disease Trends" type="bar" dataKey="reports" />
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="font-semibold text-gray-950 dark:text-white">Regional Alerts</h3>
      <div className="mt-5 space-y-3">
        {['Tomato early blight rising in Bogura', 'Rice blast reports stable in Rangpur', 'Mango anthracnose watch in Rajshahi'].map((item) => (
          <p key={item} className="rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">{item}</p>
        ))}
      </div>
    </div>
  </div>
)

const PaymentsPanel = () => (
  <div className="grid gap-5 lg:grid-cols-3">
    <CropCard title="Collected" subtitle="This month" value="৳840k" />
    <CropCard title="Pending" subtitle="Marketplace payouts" value="৳96k" />
    <CropCard title="Refunds" subtitle="Open requests" value="৳8k" />
    <div className="lg:col-span-3"><ChartCard title="Payment Analytics" type="line" dataKey="sales" /></div>
  </div>
)

const ReportsExportPanel = () => (
  <div className="grid gap-5 md:grid-cols-3">
    {['Users CSV', 'Disease PDF', 'Marketplace XLS'].map((item) => (
      <button key={item} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left font-semibold text-gray-950 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
        {item}<FiDownload className="text-green-600" />
      </button>
    ))}
  </div>
)

const SettingsPanel = ({ title }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
    <h3 className="font-semibold text-gray-950 dark:text-white">{title}</h3>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {['Email Notifications', 'SMS Alerts', 'Dark Mode Preference', 'Two Factor Security'].map((item) => (
        <label key={item} className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
          <span className="font-medium text-gray-700 dark:text-gray-200">{item}</span>
          <input type="checkbox" defaultChecked className="rounded text-green-600" />
        </label>
      ))}
    </div>
  </div>
)

const HistoryTable = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
    <h3 className="font-semibold text-gray-950 dark:text-white">Detection History</h3>
    <div className="mt-5 grid gap-3">
      {['Tomato Early Blight · 92%', 'Rice Blast · 88%', 'Mango Anthracnose · 84%'].map((item) => (
        <div key={item} className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
          <span className="text-gray-700 dark:text-gray-200">{item}</span>
          <span className="flex items-center gap-2 text-sm text-green-600"><FiCalendar /> Today</span>
        </div>
      ))}
    </div>
  </div>
)

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)
const titleCase = (value) => value.split('-').map(capitalize).join(' ')
