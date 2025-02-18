export const useCart = () => {
  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeFromCart = (productId: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = cart.filter((item: any) => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const getCart = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  }

  const clearCart = () => {
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