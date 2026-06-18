import {
  FiActivity,
  FiAlertCircle,
  FiBell,
  FiBookOpen,
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiCloud,
  FiCreditCard,
  FiDroplet,
  FiFileText,
  FiGlobe,
  FiHeart,
  FiHome,
  FiLayers,
  FiMapPin,
  FiMessageCircle,
  FiPackage,
  FiPieChart,
  FiSettings,
  FiShield,
  FiShoppingBag,
  FiShoppingCart,
  FiSun,
  FiTrendingUp,
  FiTruck,
  FiUsers,
  FiZap,
} from 'react-icons/fi'

export const roles = ['farmer', 'buyer', 'student', 'admin']

export const roleDashboards = {
  farmer: '/farmer/dashboard',
  buyer: '/buyer/dashboard',
  student: '/student/dashboard',
  admin: '/admin/dashboard',
}

export const publicNav = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Features', path: '/features' },
  { label: 'Marketplace', path: '/marketplace-landing' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
]

export const featureCards = [
  {
    title: 'Plant Disease Detection',
    description: 'Upload crop images and receive AI-powered diagnosis, confidence score, and treatment guidance.',
    icon: FiActivity,
    color: 'green',
  },
  {
    title: 'Soil Analysis',
    description: 'Track pH, NPK, moisture, and fertility signals with clear recommendations for each crop.',
    icon: FiDroplet,
    color: 'blue',
  },
  {
    title: 'Weather Prediction',
    description: 'Plan field work with forecast cards, humidity trends, temperature charts, and rain alerts.',
    icon: FiCloud,
    color: 'sky',
  },
  {
    title: 'Smart Irrigation',
    description: 'Calculate water needs and receive crop-specific irrigation schedules and alerts.',
    icon: FiZap,
    color: 'cyan',
  },
  {
    title: 'Crop Recommendation',
    description: 'Match soil, season, and location with profitable crop choices and yield predictions.',
    icon: FiSun,
    color: 'amber',
  },
  {
    title: 'AI Farming Chatbot',
    description: 'Ask practical agriculture questions and keep a searchable chat history for field decisions.',
    icon: FiMessageCircle,
    color: 'emerald',
  },
]

export const products = [
  { id: 1, name: 'Organic Tomato', category: 'Vegetables', price: 45, unit: 'kg', rating: 4.8, seller: 'Rahman Farms', location: 'Bogura', stock: 120, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Premium Rice', category: 'Grains', price: 72, unit: 'kg', rating: 4.7, seller: 'Green Delta', location: 'Dinajpur', stock: 640, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Fresh Mango', category: 'Fruits', price: 130, unit: 'kg', rating: 4.9, seller: 'Rajshahi Orchard', location: 'Rajshahi', stock: 260, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80' },
  { id: 4, name: 'Mustard Oil Seed', category: 'Seeds', price: 95, unit: 'kg', rating: 4.6, seller: 'North Agro', location: 'Rangpur', stock: 90, image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?auto=format&fit=crop&w=900&q=80' },
  { id: 5, name: 'Hydroponic Lettuce', category: 'Vegetables', price: 80, unit: 'bundle', rating: 4.8, seller: 'Urban Greens', location: 'Dhaka', stock: 75, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=900&q=80' },
  { id: 6, name: 'Natural Compost', category: 'Fertilizer', price: 28, unit: 'kg', rating: 4.5, seller: 'SoilCare BD', location: 'Jashore', stock: 420, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80' },
]

export const chartData = [
  { name: 'Jan', crops: 28, sales: 42, reports: 11, users: 120 },
  { name: 'Feb', crops: 35, sales: 50, reports: 15, users: 160 },
  { name: 'Mar', crops: 46, sales: 58, reports: 18, users: 220 },
  { name: 'Apr', crops: 52, sales: 71, reports: 21, users: 280 },
  { name: 'May', crops: 61, sales: 86, reports: 19, users: 340 },
  { name: 'Jun', crops: 70, sales: 93, reports: 24, users: 420 },
  { name: 'Jul', crops: 78, sales: 110, reports: 27, users: 510 },
]

export const forecast = [
  { day: 'Today', temp: 31, humidity: 72, rain: 18, condition: 'Sunny' },
  { day: 'Fri', temp: 30, humidity: 76, rain: 32, condition: 'Cloudy' },
  { day: 'Sat', temp: 29, humidity: 81, rain: 55, condition: 'Rain' },
  { day: 'Sun', temp: 32, humidity: 68, rain: 12, condition: 'Sunny' },
  { day: 'Mon', temp: 31, humidity: 70, rain: 24, condition: 'Cloudy' },
  { day: 'Tue', temp: 28, humidity: 84, rain: 62, condition: 'Rain' },
  { day: 'Wed', temp: 30, humidity: 74, rain: 27, condition: 'Cloudy' },
]

export const activities = [
  'Disease scan completed for tomato plot with 92% confidence.',
  'Soil report recommends balanced potassium application.',
  'Weather alert: heavy rain probability increased for Saturday.',
  'Buyer order #SAIS-2041 moved to shipping.',
  'Irrigation schedule updated for rice field block B.',
]

export const testimonials = [
  { name: 'Md. Karim', role: 'Farmer', quote: 'SAIS helped me detect leaf spot early and save a full tomato cycle.' },
  { name: 'Nusrat Jahan', role: 'Buyer', quote: 'The marketplace makes it easy to buy fresh produce from verified farmers.' },
  { name: 'Ariyan Islam', role: 'Student', quote: 'The learning center explains agriculture AI in a practical, visual way.' },
]

export const notifications = [
  { title: 'Weather Alert', text: 'Rain expected in 48 hours. Adjust irrigation schedule.', type: 'warning' },
  { title: 'Order Confirmed', text: 'Your organic tomato order has been accepted.', type: 'success' },
  { title: 'Report Ready', text: 'New soil analysis recommendation is available.', type: 'info' },
]

export const dashboardMenus = {
  farmer: [
    { label: 'Dashboard', path: '/farmer/dashboard', icon: FiHome },
    { label: 'Disease Detection', path: '/farmer/disease-detection', icon: FiActivity },
    { label: 'Soil Analysis', path: '/farmer/soil-analysis', icon: FiDroplet },
    { label: 'Weather Prediction', path: '/farmer/weather-prediction', icon: FiCloud },
    { label: 'Smart Irrigation', path: '/farmer/smart-irrigation', icon: FiZap },
    { label: 'Crop Recommendation', path: '/farmer/crop-recommendation', icon: FiSun },
    { label: 'AI Chatbot', path: '/farmer/chatbot', icon: FiMessageCircle },
    { label: 'Marketplace', path: '/farmer/marketplace', icon: FiShoppingBag },
    { label: 'My Products', path: '/farmer/my-products', icon: FiBox },
    { label: 'Add Product', path: '/farmer/add-product', icon: FiPackage },
    { label: 'Orders', path: '/farmer/orders', icon: FiTruck },
    { label: 'Notifications', path: '/farmer/notifications', icon: FiBell },
    { label: 'Settings', path: '/farmer/settings', icon: FiSettings },
    { label: 'Profile', path: '/farmer/profile', icon: FiUsers },
  ],
  buyer: [
    { label: 'Dashboard', path: '/buyer/dashboard', icon: FiHome },
    { label: 'Marketplace', path: '/buyer/marketplace', icon: FiShoppingBag },
    { label: 'Product Details', path: '/buyer/product-details', icon: FiPackage },
    { label: 'Shopping Cart', path: '/buyer/cart', icon: FiShoppingCart },
    { label: 'Checkout', path: '/buyer/checkout', icon: FiCreditCard },
    { label: 'Order Tracking', path: '/buyer/order-tracking', icon: FiTruck },
    { label: 'Wishlist', path: '/buyer/wishlist', icon: FiHeart },
    { label: 'Profile', path: '/buyer/profile', icon: FiUsers },
    { label: 'Notifications', path: '/buyer/notifications', icon: FiBell },
    { label: 'Settings', path: '/buyer/settings', icon: FiSettings },
  ],
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: FiHome },
    { label: 'Learning Center', path: '/student/learning-center', icon: FiBookOpen },
    { label: 'Disease Knowledge', path: '/student/disease-knowledge', icon: FiActivity },
    { label: 'Soil Module', path: '/student/soil-module', icon: FiDroplet },
    { label: 'Weather Module', path: '/student/weather-module', icon: FiCloud },
    { label: 'AI Assistant', path: '/student/chat-assistant', icon: FiMessageCircle },
    { label: 'Saved Articles', path: '/student/saved-articles', icon: FiFileText },
    { label: 'Profile', path: '/student/profile', icon: FiUsers },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { label: 'User Management', path: '/admin/users', icon: FiUsers },
    { label: 'Disease Monitoring', path: '/admin/disease-monitoring', icon: FiActivity },
    { label: 'Soil Reports', path: '/admin/soil-reports', icon: FiDroplet },
    { label: 'Crop Analytics', path: '/admin/crop-analytics', icon: FiPieChart },
    { label: 'Marketplace', path: '/admin/marketplace', icon: FiShoppingBag },
    { label: 'Orders', path: '/admin/orders', icon: FiTruck },
    { label: 'Payments', path: '/admin/payments', icon: FiCreditCard },
    { label: 'Notifications', path: '/admin/notifications', icon: FiBell },
    { label: 'Reports Export', path: '/admin/reports-export', icon: FiFileText },
    { label: 'System Settings', path: '/admin/system-settings', icon: FiSettings },
    { label: 'Profile', path: '/admin/profile', icon: FiShield },
  ],
}

export const dashboardStats = {
  farmer: [
    { title: 'Total Crops', value: '18', change: 12, icon: FiSun, color: 'green' },
    { title: 'Disease Reports', value: '43', change: 8, icon: FiAlertCircle, color: 'red' },
    { title: 'Soil Reports', value: '29', change: 15, icon: FiDroplet, color: 'blue' },
    { title: 'Weather Alerts', value: '7', change: -3, icon: FiCloud, color: 'sky' },
    { title: 'Marketplace Sales', value: '৳86k', change: 22, icon: FiTrendingUp, color: 'emerald' },
  ],
  buyer: [
    { title: 'Orders', value: '36', change: 18, icon: FiShoppingCart, color: 'green' },
    { title: 'Wishlist', value: '14', change: 5, icon: FiHeart, color: 'red' },
    { title: 'Saved Farmers', value: '9', change: 7, icon: FiUsers, color: 'blue' },
    { title: 'In Transit', value: '4', change: 2, icon: FiTruck, color: 'sky' },
  ],
  student: [
    { title: 'Courses', value: '12', change: 20, icon: FiBookOpen, color: 'green' },
    { title: 'Saved Articles', value: '31', change: 11, icon: FiFileText, color: 'blue' },
    { title: 'AI Chats', value: '58', change: 14, icon: FiMessageCircle, color: 'emerald' },
    { title: 'Certificates', value: '3', change: 1, icon: FiCheckCircle, color: 'amber' },
  ],
  admin: [
    { title: 'Total Users', value: '12,480', change: 16, icon: FiUsers, color: 'green' },
    { title: 'Farmers', value: '6,920', change: 12, icon: FiSun, color: 'emerald' },
    { title: 'Buyers', value: '4,300', change: 18, icon: FiShoppingBag, color: 'blue' },
    { title: 'Students', value: '1,260', change: 24, icon: FiBookOpen, color: 'sky' },
    { title: 'Revenue', value: '৳9.8M', change: 21, icon: FiTrendingUp, color: 'amber' },
    { title: 'Disease Reports', value: '2,184', change: 9, icon: FiActivity, color: 'red' },
  ],
}

export const learningModules = [
  { title: 'Precision Farming Basics', level: 'Beginner', lessons: 8, icon: FiGlobe },
  { title: 'Plant Disease Recognition', level: 'Intermediate', lessons: 12, icon: FiActivity },
  { title: 'Soil Nutrient Science', level: 'Intermediate', lessons: 10, icon: FiLayers },
  { title: 'Weather and Climate Risk', level: 'Advanced', lessons: 7, icon: FiCloud },
]
