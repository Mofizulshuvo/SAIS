import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import FarmerRoute from './FarmerRoute'
import BuyerRoute from './BuyerRoute'

// Pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import FarmerDashboard from '../pages/FarmerDashboard'
import BuyerDashboard from '../pages/BuyerDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import DiseaseDetection from '../pages/DiseaseDetection'
import SoilAnalysis from '../pages/SoilAnalysis'
import WeatherPrediction from '../pages/WeatherPrediction'
import SmartIrrigation from '../pages/SmartIrrigation'
import CropRecommendation from '../pages/CropRecommendation'
import Marketplace from '../pages/Marketplace'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Orders from '../pages/Orders'
import Chatbot from '../pages/Chatbot'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/farmer-dashboard"
        element={
          <FarmerRoute>
            <FarmerDashboard />
          </FarmerRoute>
        }
      />
      
      <Route
        path="/buyer-dashboard"
        element={
          <BuyerRoute>
            <BuyerDashboard />
          </BuyerRoute>
        }
      />
      
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      
      {/* AI Module Routes */}
      <Route
        path="/disease-detection"
        element={
          <ProtectedRoute>
            <DiseaseDetection />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/soil-analysis"
        element={
          <ProtectedRoute>
            <SoilAnalysis />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <WeatherPrediction />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/irrigation"
        element={
          <ProtectedRoute>
            <SmartIrrigation />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/crop-recommendation"
        element={
          <ProtectedRoute>
            <CropRecommendation />
          </ProtectedRoute>
        }
      />
      
      {/* Marketplace Routes */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/marketplace/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      
      {/* Chatbot Route */}
      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />
      
      {/* Profile & Settings Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
