import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../components/layout/DashboardLayout'
import PublicLayout from '../layouts/PublicLayout'
import {
  AboutPage,
  ContactPage,
  FAQPage,
  FeaturesPage,
  HomePage,
  MarketplaceLandingPage,
  PrivacyPolicyPage,
  TermsPage,
} from '../pages/sais/PublicPages'
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyOTPPage,
} from '../pages/sais/AuthPages'
import { DashboardFeaturePage, RoleDashboardPage } from '../pages/sais/DashboardPages'
import NotFound from '../pages/NotFound'

const farmerPages = [
  'disease-detection',
  'soil-analysis',
  'weather-prediction',
  'smart-irrigation',
  'crop-recommendation',
  'chatbot',
  'marketplace',
  'my-products',
  'add-product',
  'orders',
  'notifications',
  'settings',
  'profile',
]

const buyerPages = [
  'marketplace',
  'product-details',
  'cart',
  'checkout',
  'order-tracking',
  'wishlist',
  'profile',
  'notifications',
  'settings',
]

const studentPages = [
  'learning-center',
  'disease-knowledge',
  'soil-module',
  'weather-module',
  'chat-assistant',
  'saved-articles',
  'profile',
]

const adminPages = [
  'users',
  'disease-monitoring',
  'soil-reports',
  'crop-analytics',
  'marketplace',
  'orders',
  'payments',
  'notifications',
  'reports-export',
  'system-settings',
  'profile',
]

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/marketplace-landing" element={<MarketplaceLandingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-and-conditions" element={<TermsPage />} />
    </Route>

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/verify-otp" element={<VerifyOTPPage />} />

    <Route path="/dashboard" element={<DashboardRedirect />} />
    <Route path="/farmer/*" element={<RoleRoute role="farmer" pages={farmerPages} />} />
    <Route path="/buyer/*" element={<RoleRoute role="buyer" pages={buyerPages} />} />
    <Route path="/student/*" element={<RoleRoute role="student" pages={studentPages} />} />
    <Route path="/admin/*" element={<RoleRoute role="admin" pages={adminPages} />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
)

const RoleRoute = ({ role, pages }) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.role && user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />

  return (
    <DashboardLayout role={role}>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<RoleDashboardPage role={role} />} />
        {pages.map((page) => (
          <Route key={page} path={page} element={<DashboardFeaturePage role={role} type={page} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </DashboardLayout>
  )
}

const DashboardRedirect = () => {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Navigate to={`/${user?.role || 'farmer'}/dashboard`} replace />
}

export default AppRoutes
