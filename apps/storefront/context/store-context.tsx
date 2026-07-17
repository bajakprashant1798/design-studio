'use client'

import React, { createContext, useContext, useState } from 'react'

interface StoreContextType {
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)

  return <StoreContext.Provider value={{ cartOpen, setCartOpen }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
