'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginCustomer } from '@/lib/actions/customer'

export default function AccountLoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email.trim()) return

    setLoading(true)
    try {
      await loginCustomer(formData.email, formData.name || 'Member')
      router.refresh()
    } catch (err) {
      console.error('Sign in failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          MEMBERSHIP PORTAL
        </span>
        <h1 className="font-serif text-2xl tracking-tight text-black dark:text-white">Sign In</h1>
        <p className="text-xs text-zinc-500 font-light max-w-xs mx-auto">
          Create or access your member profile to review order details and shipping logs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Jean-Luc Godard"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="e.g. godard@nouvellevague.com"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-widest uppercase py-4 border border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all duration-200"
        >
          {loading ? 'Signing in...' : 'Continue'}
        </button>
      </form>
    </div>
  )
}
