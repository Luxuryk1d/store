import type { Product } from '~/types'

export const useCart = () => {
  const addToCart = (product: Product): void => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeFromCart = (productId: number): void => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
    const updatedCart = cart.filter((item: Product) => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const getCart = (): Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
  }

  const clearCart = (): void => {
    localStorage.setItem('cart', '[]')
    window.dispatchEvent(new Event('cartUpdated'))
  }

  return {
    addToCart,
    removeFromCart,
    getCart,
    clearCart
  }
}