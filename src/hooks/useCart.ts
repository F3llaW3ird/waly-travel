'use client'

import { create } from 'zustand'

export interface CartItem {
  _id: string
  name: string
  precio: number
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  total: () => number
  itemsCount: () => number
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().items.find((i) => i._id === item._id)
    if (existing) {
      set({
        items: get().items.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] })
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i._id !== id) })
  },
  updateQuantity: (id, qty) => {
    if (qty <= 0) {
      get().removeItem(id)
      return
    }
    set({
      items: get().items.map((i) => (i._id === id ? { ...i, quantity: qty } : i)),
    })
  },
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((acc, i) => acc + i.precio * i.quantity, 0),
  itemsCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
}))
