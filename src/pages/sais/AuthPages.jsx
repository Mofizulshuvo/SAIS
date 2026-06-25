import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiGithub, FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/slices/authSlice'
import { roleDashboards, roles } from '../../data/saisData'

const AuthLayout = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-gray-50 px-4 py-24 dark:bg-gray-950">
    <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center lg:block">
        <div className="flex h-full min-h-[680px] flex-col justify-end bg-green-950/65 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">SAIS Secure Access</p>
          <h1 className="mt-4 text-4xl font-bold">AI agriculture tools for every role</h1>
          <p className="mt-4 text-green-50">Choose Farmer, Buyer, Student, or Admin during login to open the matching dashboard.</p>
        </div>
      </div>
      <div className="p-6 sm:p-10">
        <Link to="/" className="text-2xl font-bold text-green-700 dark:text-green-400">SAIS</Link>
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{title}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  </div>
)

const Field = ({ icon: Icon, type = 'text', label, value, onChange, placeholder, error, right }) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
    <div className="relative mt-2">
      {Icon && <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white py-3 ${Icon ? 'pl-12' : 'pl-4'} pr-12 text-gray-900 outline-none ring-green-500 transition focus:ring-2 dark:bg-gray-950 dark:text-white ${
          error ? 'border-red-400' : 'border-gray-200 dark:border-gray-800'
        }`}
      />
      {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
    </div>
    {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
  </label>
)

export const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('farmer@sais.local')
  const [password, setPassword] = useState('password123')
  const [role, setRole] = useState('buyer')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!email.includes('@')) nextErrors.email = 'Enter a valid email address'
    if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    dispatch(loginSuccess({ user: { name: `Demo ${role}`, email, role }, token: 'demo-token', refreshToken: 'demo-refresh-token' }))
    navigate(roleDashboards[role])
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Login with a demo role to open the complete SAIS dashboard.">
      <form onSubmit={submit} className="mt-8 space-y-5">
        <Field icon={FiMail} label="Email" value={email} onChange={setEmail} placeholder="you@sais.local" error={errors.email} />
        <Field
          icon={FiLock}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          error={errors.password}
          right={<button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-gray-500">{showPassword ? <FiEyeOff /> : <FiEye />}</button>}
        />
        <label className="block">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Role</span>
          <select value={role} onChange={(event) => setRole(event.target.value)} className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white">
            {roles.map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}
          </select>
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><input type="checkbox" className="rounded text-green-600" /> Remember me</label>
          <Link to="/forgot-password" className="font-semibold text-green-700 dark:text-green-400">Forgot password?</Link>
        </div>
        <button className="w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Login</button>
        <SocialButtons />
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">No account? <Link to="/register" className="font-semibold text-green-700 dark:text-green-400">Create one</Link></p>
      </form>
    </AuthLayout>
  )
}

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <AuthLayout title="Create your account" subtitle="Register as a farmer, buyer, student, or admin demo user.">
      <form className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field icon={FiUser} label="Full name" value="" onChange={() => {}} placeholder="Your name" />
          <Field icon={FiPhone} label="Phone" value="" onChange={() => {}} placeholder="+880..." />
        </div>
        <Field icon={FiMail} label="Email" value="" onChange={() => {}} placeholder="you@sais.local" />
        <Field
          icon={FiLock}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value=""
          onChange={() => {}}
          placeholder="Create password"
          right={<button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-gray-500">{showPassword ? <FiEyeOff /> : <FiEye />}</button>}
        />
        <select className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 dark:text-white">
          {roles.map((role) => <option key={role}>{role[0].toUpperCase() + role.slice(1)}</option>)}
        </select>
        <button className="w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Register</button>
        <SocialButtons />
      </form>
    </AuthLayout>
  )
}

export const ForgotPasswordPage = () => (
  <AuthLayout title="Forgot password" subtitle="Enter your email and receive a verification OTP.">
    <form className="mt-8 space-y-5">
      <Field icon={FiMail} label="Email" value="" onChange={() => {}} placeholder="you@sais.local" />
      <Link to="/verify-otp" className="block w-full rounded-2xl bg-green-600 px-5 py-3 text-center font-semibold text-white hover:bg-green-700">Send OTP</Link>
    </form>
  </AuthLayout>
)

export const VerifyOTPPage = () => (
  <AuthLayout title="Verify OTP" subtitle="Use the six-digit demo code sent to your email.">
    <form className="mt-8 space-y-5">
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <input key={index} maxLength="1" className="h-14 rounded-2xl border border-gray-200 bg-white text-center text-xl font-bold dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
        ))}
      </div>
      <Link to="/reset-password" className="block w-full rounded-2xl bg-green-600 px-5 py-3 text-center font-semibold text-white hover:bg-green-700">Verify OTP</Link>
    </form>
  </AuthLayout>
)

export const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <AuthLayout title="Reset password" subtitle="Create a new secure password for your SAIS account.">
      <form className="mt-8 space-y-5">
        <Field
          icon={FiLock}
          type={showPassword ? 'text' : 'password'}
          label="New password"
          value=""
          onChange={() => {}}
          placeholder="New password"
          right={<button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-gray-500">{showPassword ? <FiEyeOff /> : <FiEye />}</button>}
        />
        <Field icon={FiLock} type="password" label="Confirm password" value="" onChange={() => {}} placeholder="Confirm password" />
        <Link to="/login" className="block w-full rounded-2xl bg-green-600 px-5 py-3 text-center font-semibold text-white hover:bg-green-700">Reset Password</Link>
      </form>
    </AuthLayout>
  )
}

const SocialButtons = () => (
  <div className="grid gap-3 sm:grid-cols-2">
    <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800">
      <FiGithub /> GitHub
    </button>
    <button type="button" className="rounded-2xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800">
      Google
    </button>
  </div>
)
