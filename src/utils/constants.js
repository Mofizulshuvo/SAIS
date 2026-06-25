export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const USER_ROLES = {
  ADMIN: 'admin',
  FARMER: 'farmer',
}

export const CROP_CATEGORIES = {
  CEREALS: 'cereals',
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  LEGUMES: 'legumes',
  TUBERS: 'tubers',
  SPICES: 'spices',
}

export const DISEASE_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
}

export const SOIL_TYPES = {
  CLAY: 'clay',
  SANDY: 'sandy',
  LOAMY: 'loamy',
  SILTY: 'silty',
  PEATY: 'peaty',
  CHALKY: 'chalky',
}

export const WEATHER_CONDITIONS = {
  SUNNY: 'sunny',
  CLOUDY: 'cloudy',
  RAINY: 'rainy',
  STORMY: 'stormy',
  SNOWY: 'snowy',
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
  CREDIT_CARD: 'credit_card',
  BANK_TRANSFER: 'bank_transfer',
  MOBILE_PAYMENT: 'mobile_payment',
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
}

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
}
