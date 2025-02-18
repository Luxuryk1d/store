<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <nuxt-link to="/" class="text-decoration-none text-black">
          Магазин
        </nuxt-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/cart" class="mr-4">
        <v-badge
          :content="cartItemCount"
          :value="cartItemCount"
          color="error"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const cartItemCount = ref<number>(0)

onMounted(() => {
  const updateCartCount = (): void => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cartItemCount.value = cart.length
  }

  updateCartCount()

  window.addEventListener('storage', updateCartCount)
  window.addEventListener('cartUpdated', updateCartCount)

  onUnmounted(() => {
    window.removeEventListener('storage', updateCartCount)
    window.removeEventListener('cartUpdated', updateCartCount)
  })
})
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>