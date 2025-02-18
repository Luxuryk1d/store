<template>
  <div>
    <h1 class="text-h4 mb-6">Корзина товаров</h1>

    <v-card v-if="cartItems.length > 0">
      <v-list>
        <TransitionGroup name="list">
          <v-list-item
            v-for="item in cartItems"
            :key="item.id"
            :title="item.title"
          >
            <template v-slot:prepend>
              <v-avatar size="100">
                <v-img :src="item.image" cover></v-img>
              </v-avatar>
            </template>

            <template v-slot:subtitle>
              <div class="text-h6 mt-2">${{ item.price }}</div>
            </template>

            <template v-slot:append>
              <v-btn
                color="error"
                variant="text"
                @click="handleRemoveFromCart(item.id)"
              >
                Удалить
              </v-btn>
            </template>
          </v-list-item>
        </TransitionGroup>
      </v-list>

      <v-divider></v-divider>

      <v-card-text class="text-right">
        <p class="text-h5">
          В общем: ${{ totalPrice.toFixed(2) }}
        </p>
      </v-card-text>

      <v-card-actions class="justify-end pa-4">
        <v-btn
          color="primary"
          size="large"
          @click="checkout"
        >
          Оформить заказ
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else>
      <v-card-text class="text-center pa-6">
        <v-icon
          size="64"
          color="grey-lighten-1"
          class="mb-4"
        >
          mdi-cart-off
        </v-icon>
        <h3 class="text-h5 mb-2">Ваша корзина пуста</h3>
        <p class="mb-4">Добавьте товары в корзину</p>
        <v-btn
          color="primary"
          to="/"
        >
          На главную
        </v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showThankYou" max-width="400">
      <v-card>
        <v-card-text class="text-center pa-6">
          <v-icon
            size="64"
            color="success"
            class="mb-4"
          >
            mdi-check-circle
          </v-icon>
          <h3 class="text-h5 mb-2">Спасибо за покупку!</h3>
          <p>Ваш заказ будет успешно оформлен!</p>
        </v-card-text>
        <v-card-actions class="justify-center pa-4">
          <v-btn
            color="primary"
            @click="finishCheckout"
          >
            Оформить заказ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const { getCart, removeFromCart, clearCart } = useCart()
const router = useRouter()
const cartItems = ref(getCart())
const showThankYou = ref(false)

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price, 0)
})

const handleRemoveFromCart = (productId: number) => {
  removeFromCart(productId)
  cartItems.value = cartItems.value.filter(item => item.id !== productId)
}

const checkout = () => {
  showThankYou.value = true
}

const finishCheckout = () => {
  clearCart()
  cartItems.value = []
  showThankYou.value = false
  router.push('/')
}

// Update cart when storage changes
onMounted(() => {
  const updateCart = () => {
    cartItems.value = getCart()
  }

  window.addEventListener('storage', updateCart)
  window.addEventListener('cartUpdated', updateCart)

  onUnmounted(() => {
    window.removeEventListener('storage', updateCart)
    window.removeEventListener('cartUpdated', updateCart)
  })
})
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>