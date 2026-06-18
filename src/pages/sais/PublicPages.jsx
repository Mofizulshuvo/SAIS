import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { featureCards, products, testimonials } from '../../data/saisData'
import { ProductGrid, SectionHeader } from '../../components/sais/SAISComponents'

const heroImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80'

export const HomePage = () => (
  <div className="bg-white dark:bg-gray-950">
    <section className="relative min-h-[92vh] overflow-hidden">
      <img src={heroImage} alt="Green agriculture field" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/55 to-green-900/30" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 pt-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl pb-16 text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-green-300">AI Smart Agriculture Information System</p>
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">SAIS</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
            A modern agriculture platform for farmers, buyers, students, and admins with AI crop intelligence, marketplace tools, and actionable analytics.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700">
              Start Free <FiArrowRight />
            </Link>
            <Link to="/features" className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-4 font-semibold text-white hover:bg-white/10">
              Explore Features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="about">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="About SAIS"
          title="One connected workspace for smarter agriculture decisions"
          description="SAIS combines AI diagnosis, soil intelligence, weather planning, smart irrigation, crop recommendations, and verified commerce into a responsive web experience."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['18k+', 'Farmers Supported'],
            ['92%', 'Detection Accuracy'],
            ['৳9.8M', 'Marketplace Volume'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">{value}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-gray-50 py-20 dark:bg-gray-900" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader centered eyebrow="AI Features" title="Built for real field and market workflows" description="Each module uses dummy data here, with API-ready structure for backend integration." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <Icon className="h-8 w-8 text-green-600" />
                <h3 className="mt-5 text-lg font-semibold text-gray-950 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Marketplace Preview" title="Buy and sell fresh agriculture products" description="Search products, filter categories, inspect stock, and move items into a cart-ready buying flow." />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <div key={product.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-semibold text-gray-950 dark:text-white">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.seller} · ৳{product.price}/{product.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-green-700 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          ['43k', 'Disease scans'],
          ['12k', 'Soil reports'],
          ['8.6k', 'AI chatbot sessions'],
          ['99.9%', 'Dashboard uptime'],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-4xl font-bold">{value}</p>
            <p className="mt-2 text-green-100">{label}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader centered eyebrow="Testimonials" title="Trusted by every SAIS role" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <div key={item.name} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-700 dark:text-gray-200">"{item.quote}"</p>
            <p className="mt-5 font-semibold text-gray-950 dark:text-white">{item.name}</p>
            <p className="text-sm text-green-600 dark:text-green-400">{item.role}</p>
          </div>
        ))}
      </div>
    </section>

    <ContactSection />
  </div>
)

export const AboutPage = () => (
  <PublicShell
    eyebrow="About Us"
    title="SAIS helps agriculture teams make decisions with clarity"
    description="This frontend is designed for Bangladesh agriculture workflows, but its role-based structure can support any regional backend. It includes dashboards, marketplace screens, education modules, analytics, and auth-ready navigation."
  />
)

export const FeaturesPage = () => (
  <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
    <SectionHeader eyebrow="Features" title="Complete AI agriculture modules" description="Explore diagnosis, soil, weather, irrigation, crop recommendation, marketplace, admin analytics, and student learning experiences." />
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {featureCards.map((feature) => {
        const Icon = feature.icon
        return (
          <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <Icon className="h-8 w-8 text-green-600" />
            <h3 className="mt-5 text-lg font-semibold text-gray-950 dark:text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        )
      })}
    </div>
  </div>
)

export const MarketplaceLandingPage = () => (
  <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
    <SectionHeader eyebrow="Marketplace" title="Verified farm products with modern shopping tools" description="A dummy product catalog with search, filters, cards, ratings, location, stock, and cart actions." />
    <div className="mt-10"><ProductGrid /></div>
  </div>
)

export const ContactPage = () => (
  <div className="pt-16">
    <ContactSection />
  </div>
)

export const FAQPage = () => (
  <PublicShell eyebrow="FAQ" title="Common SAIS questions" description="How do AI modules work? Upload or enter field data, receive dummy results in this frontend, then connect backend APIs for live predictions. Can users switch roles? Yes, the demo login accepts Farmer, Buyer, Student, and Admin roles. Does the marketplace support checkout? The UI includes cart, checkout, tracking, wishlist, and orders pages." />
)

export const PrivacyPolicyPage = () => (
  <PublicShell eyebrow="Privacy Policy" title="Privacy-first agriculture data design" description="SAIS is structured to keep user, crop, soil, disease, and marketplace data in role-aware areas. In production, connect these screens to authenticated APIs, consent controls, and secure storage policies." />
)

export const TermsPage = () => (
  <PublicShell eyebrow="Terms and Conditions" title="Responsible use of agriculture AI" description="AI recommendations should support, not replace, expert field judgment. Marketplace transactions, disease results, and weather decisions should be verified against local conditions and official guidance." />
)

const PublicShell = ({ eyebrow, title, description }) => (
  <div className="mx-auto max-w-5xl px-4 py-32 sm:px-6 lg:px-8">
    <SectionHeader eyebrow={eyebrow} title={title} description={description} />
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {['Responsive UI', 'Role Based', 'API Ready'].map((item) => (
        <div key={item} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <FiCheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-gray-900 dark:text-white">{item}</span>
        </div>
      ))}
    </div>
  </div>
)

const ContactSection = () => (
  <section className="bg-gray-50 py-20 dark:bg-gray-900" id="contact">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
      <div>
        <SectionHeader eyebrow="Contact" title="Talk to the SAIS team" description="Use the contact form for support, demos, partnership questions, or agriculture AI implementation ideas." />
        <div className="mt-8 space-y-4 text-gray-700 dark:text-gray-300">
          <p className="flex items-center gap-3"><FiMail className="text-green-600" /> support@sais.local</p>
          <p className="flex items-center gap-3"><FiPhone className="text-green-600" /> +880 1700 000000</p>
          <p className="flex items-center gap-3"><FiMapPin className="text-green-600" /> Dhaka, Bangladesh</p>
        </div>
      </div>
      <form className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 dark:text-white" placeholder="Full name" />
          <input className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 dark:text-white" placeholder="Email address" />
        </div>
        <input className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 dark:text-white" placeholder="Subject" />
        <textarea className="mt-4 h-36 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 dark:text-white" placeholder="Message" />
        <button className="mt-4 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">Send Message</button>
      </form>
    </div>
  </section>
)
