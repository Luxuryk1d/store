<template>
  <div>
    <h1 class="text-h4 mb-6 text-capitalize">
      {{ route.params.id }} категория
    </h1>
    
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="mx-auto"
          height="100%"
          :loading="loading"
        >
          <v-img
            :src="product.image"
            height="200"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-title>
            <nuxt-link
              :to="'/product/' + product.id"
              class="text-decoration-none text-black"
            >
              {{ product.title }}
            </nuxt-link>
          </v-card-title>

          <v-card-text>
            <v-row align="center">
              <v-col>
                <div class="text-h6 font-weight-bold">
                  ${{ product.price }}
                </div>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  color="primary"
                  @click="addToCart(product)"
                >
                  Купить
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const products = ref([])
const loading = ref(true)
const { addToCart } = useCart()

onMounted(async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${route.params.id}`)
    products.value = await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
})
</script>